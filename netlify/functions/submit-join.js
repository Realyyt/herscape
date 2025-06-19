const { z } = require('zod');

// Form validation schema for Join form
const joinFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  tier: z.string().min(1, { message: "Please select a membership tier" }),
  company: z.string().optional(),
  linkedin: z.string().optional(),
  message: z.string().optional(),
});

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    // Check if RESEND_API_KEY is set
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Email service configuration error. Please contact support.' 
        })
      };
    }

    // Parse the request body
    const formData = JSON.parse(event.body);
    
    // Validate form data
    const validatedData = joinFormSchema.parse(formData);
    
    // Get payment amount based on tier
    const tierPrices = {
      supporter: '$50',
      pioneer: '$250',
      angel: '$500'
    };
    
    const paymentAmount = tierPrices[validatedData.tier] || '$50';
    
    // Prepare the admin email data
    const adminEmailData = {
      from: 'Herscape <contact@herscape.org>',
      to: ['contact@herscape.org'],
      reply_to: validatedData.email,
      subject: `New Founding Circle Application: ${validatedData.firstName} ${validatedData.lastName} - ${validatedData.tier}`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #bdda57; border-bottom: 2px solid #bdda57; padding-bottom: 10px;">
                New Founding Circle Application
              </h1>
              
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h2 style="color: #333; margin-top: 0;">Applicant Information</h2>
                <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
                <p><strong>Email:</strong> ${validatedData.email}</p>
                <p><strong>Phone:</strong> ${validatedData.phone}</p>
                <p><strong>Membership Tier:</strong> ${validatedData.tier.charAt(0).toUpperCase() + validatedData.tier.slice(1)}</p>
                ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
                ${validatedData.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${validatedData.linkedin}" target="_blank">${validatedData.linkedin}</a></p>` : ''}
              </div>
              
              ${validatedData.message ? `
                <div style="background-color: #eaffd0; padding: 20px; border-radius: 10px; margin: 20px 0;">
                  <h3 style="color: #333; margin-top: 0;">Why they want to join Herscape:</h3>
                  <p style="white-space: pre-wrap;">${validatedData.message}</p>
                </div>
              ` : ''}
              
              <div style="background-color: #bdda57; color: white; padding: 15px; border-radius: 10px; text-align: center; margin-top: 30px;">
                <p style="margin: 0; font-weight: bold;">This is a Founding Circle application - please review and respond promptly!</p>
              </div>
              
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-top: 0;">Payment Instructions for Applicant</h3>
                <p style="margin-bottom: 10px;"><strong>Amount:</strong> ${paymentAmount}</p>
                <p style="margin-bottom: 5px;"><strong>Account Holder:</strong> Salem Andero</p>
                <p style="margin-bottom: 5px;"><strong>Bank:</strong> Wells Fargo Bank, N.A.</p>
                <p style="margin-bottom: 5px;"><strong>Account Number:</strong> 40630159095097994</p>
                <p style="margin-bottom: 5px;"><strong>Routing Number:</strong> 121000248</p>
                <p style="margin-bottom: 5px;"><strong>Account Type:</strong> Checking</p>
                <p style="margin-bottom: 5px;"><strong>Address:</strong> 580 California Street, San Francisco, CA 94104, US</p>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #6b7280;"><em>Note: This is a temporary payment method while we await company account approval.</em></p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                <p>This application was submitted through the Herscape website.</p>
                <p>Reply to this email to respond directly to the applicant.</p>
              </div>
            </div>
          </body>
        </html>
      `
    };

    // Prepare the applicant confirmation email
    const applicantEmailData = {
      from: 'Herscape <contact@herscape.org>',
      to: [validatedData.email],
      subject: `Welcome to Herscape Founding Circle - Application Confirmation`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #bdda57; margin-bottom: 10px;">Welcome to Herscape!</h1>
                <p style="font-size: 18px; color: #666;">Your Founding Circle application has been received</p>
              </div>
              
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h2 style="color: #333; margin-top: 0;">Application Details</h2>
                <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
                <p><strong>Email:</strong> ${validatedData.email}</p>
                <p><strong>Membership Tier:</strong> ${validatedData.tier.charAt(0).toUpperCase() + validatedData.tier.slice(1)}</p>
                <p><strong>Payment Amount:</strong> ${paymentAmount}</p>
                ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
              </div>
              
              <div style="background-color: #eaffd0; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Next Steps</h3>
                <p>To complete your membership and join the Herscape Founding Circle, please complete the payment using the details below:</p>
              </div>
              
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-top: 0;">Payment Instructions</h3>
                <p style="margin-bottom: 10px;"><strong>Amount to Send:</strong> ${paymentAmount}</p>
                <p style="margin-bottom: 5px;"><strong>Account Holder:</strong> Salem Andero</p>
                <p style="margin-bottom: 5px;"><strong>Bank:</strong> Wells Fargo Bank, N.A.</p>
                <p style="margin-bottom: 5px;"><strong>Account Number:</strong> 40630159095097994</p>
                <p style="margin-bottom: 5px;"><strong>Routing Number:</strong> 121000248</p>
                <p style="margin-bottom: 5px;"><strong>Account Type:</strong> Checking</p>
                <p style="margin-bottom: 5px;"><strong>Address:</strong> 580 California Street, San Francisco, CA 94104, US</p>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #6b7280;"><em>Note: This is a temporary payment method while we await company account approval.</em></p>
              </div>
              
              <div style="background-color: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
                <h4 style="color: #856404; margin-top: 0;">Important Reminder</h4>
                <p style="margin: 0; color: #856404;">Please include your name in the payment memo/reference so we can properly track your payment.</p>
              </div>
              
              <div style="background-color: #d1ecf1; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #17a2b8;">
                <h4 style="color: #0c5460; margin-top: 0;">What Happens Next?</h4>
                <ul style="margin: 0; padding-left: 20px; color: #0c5460;">
                  <li>We'll review your application within 24-48 hours</li>
                  <li>Once payment is received, we'll confirm your membership</li>
                  <li>You'll receive access to exclusive Founding Circle benefits</li>
                  <li>Welcome to the most influential women in women's entrepreneurship!</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <p style="color: #666; font-size: 14px;">Thank you for choosing to join the Herscape Founding Circle!</p>
                <p style="color: #666; font-size: 12px;">If you have any questions, please reply to this email or contact us at contact@herscape.org</p>
              </div>
            </div>
          </body>
        </html>
      `
    };
    
    console.log('Attempting to send emails via Resend API...');
    
    // Send admin email first
    const adminResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify(adminEmailData)
    });
    
    console.log('Admin email response status:', adminResponse.status);
    
    if (!adminResponse.ok) {
      const adminError = await adminResponse.json().catch(() => ({ message: 'Unknown error' }));
      console.error('Admin email error:', adminError);
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to submit application. Please try again later.' 
        })
      };
    }
    
    // Send applicant email
    const applicantResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify(applicantEmailData)
    });
    
    console.log('Applicant email response status:', applicantResponse.status);
    
    if (!applicantResponse.ok) {
      const applicantError = await applicantResponse.json().catch(() => ({ message: 'Unknown error' }));
      console.error('Applicant email error:', applicantError);
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to submit application. Please try again later.' 
        })
      };
    }
    
    const adminResult = await adminResponse.json();
    const applicantResult = await applicantResponse.json();
    console.log('Emails sent successfully via Resend API:', { admin: adminResult.id, applicant: applicantResult.id });
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: `Your application has been submitted successfully! To complete your membership, please send ${paymentAmount} via bank transfer to our temporary payment account. We will review your application and confirm your membership once payment is received.` 
      })
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      const fieldErrors = error.errors.reduce((acc, curr) => {
        const field = curr.path[0];
        acc[field] = curr.message;
        return acc;
      }, {});
      
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, fieldErrors })
      };
    }
    
    console.error('Form submission error:', error);
    console.error('Error stack:', error.stack);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'An unexpected error occurred. Please try again later.' 
      })
    };
  }
}; 