import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { JoinRequestEmail } from '@/emails/JoinRequest';
import { ApplicantJoinEmail } from '@/emails/ApplicantJoinEmail';
import { z } from 'zod';
import { tierMap } from '@/lib/tiers';

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

    const { firstName, lastName, email, phone, tier, company, linkedin } = parsed.data;

    const selectedTier = tierMap.get(tier);

    if (!selectedTier) {
      return NextResponse.json({ success: false, message: 'Invalid tier selected.' }, { status: 400 });
    }

    const paymentAmount = selectedTier.priceString;
    const paymentAmountMessage = `Your application has been received! The required contribution is ${paymentAmount}.`;

    const adminEmailPromise = resend.emails.send({
      from: 'Herscape <contact@herscape.org>',
      to: 'contact@herscape.org',
      subject: `New Founding Circle Application: ${firstName} ${lastName}`,
      react: JoinRequestEmail({
        firstName,
        lastName,
        email,
        phone,
        tier: selectedTier.name,
        company,
        linkedin,
        paymentAmount,
      }),
    });

    const applicantEmailPromise = resend.emails.send({
        from: 'Herscape <contact@herscape.org>',
        to: email,
        subject: 'Your Herscape Founding Circle Application',
        react: ApplicantJoinEmail({
            firstName,
            tier: selectedTier.name,
            paymentAmount,
        })
    })

    const [adminResult, applicantResult] = await Promise.all([adminEmailPromise, applicantEmailPromise]);

    if (adminResult.error || applicantResult.error) {
      console.error('Resend error:', { adminError: adminResult.error, applicantError: applicantResult.error });
      // Decide on a more specific error message if needed
      return NextResponse.json({ success: false, message: 'Error sending confirmation emails.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: paymentAmountMessage, data: { adminResult, applicantResult } }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
} 