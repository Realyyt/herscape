import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { JoinRequestEmail } from '@/emails/JoinRequest';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const joinFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  tier: z.string(),
  company: z.string().optional(),
  linkedin: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = joinFormSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ success: false, message: 'Invalid form data.', fieldErrors }, { status: 400 });
    }

    const { firstName, lastName, email, phone, tier, company, linkedin, message } = parsed.data;

    const { data, error } = await resend.emails.send({
      from: 'Herscape <contact@herscape.org>',
      to: [process.env.ADMIN_EMAIL || ''],
      subject: `New Join Request: ${firstName} ${lastName}`,
      react: JoinRequestEmail({
        firstName,
        lastName,
        email,
        phone,
        tier,
        company,
        linkedin,
        message,
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, message: 'Error sending email.' }, { status: 500 });
    }

    let paymentAmountMessage = 'Your application has been received!';
    switch (tier) {
        case 'supporter':
            paymentAmountMessage = 'Your application has been received! The required contribution is $50.';
            break;
        case 'pioneer':
            paymentAmountMessage = 'Your application has been received! The required contribution is $250.';
            break;
        case 'angel':
            paymentAmountMessage = 'Your application has been received! The required contribution is $500.';
            break;
    }

    return NextResponse.json({ success: true, message: paymentAmountMessage, data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
} 