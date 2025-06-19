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
    // Parse the request body
    const formData = JSON.parse(event.body);
    
    // Validate form data
    const validatedData = joinFormSchema.parse(formData);
    
    // Prepare the API request to Brevo
    const url = 'https://api.brevo.com/v3/smtp/email';
    
    const data = {
      sender: {
        name: "Herscape Website",
        email: "contact@herscape.org"
      },
      to: [
        {
          email: "contact@herscape.org",
          name: "Herscape Contact"
        }
      ],
      replyTo: {
        email: validatedData.email,
        name: `${validatedData.firstName} ${validatedData.lastName}`
      },
      subject: `New Founding Circle Application: ${validatedData.firstName} ${validatedData.lastName} - ${validatedData.tier}`,
      htmlContent: `
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
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                <p>This application was submitted through the Herscape website.</p>
                <p>Reply to this email to respond directly to the applicant.</p>
              </div>
            </div>
          </body>
        </html>
      `
    };
    
    // Send the email using Brevo API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || '',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to submit application. Please try again later.' 
        })
      };
    }
    
    // Get payment amount based on tier
    const tierPrices = {
      supporter: '$50',
      pioneer: '$250',
      angel: '$500'
    };
    
    const paymentAmount = tierPrices[validatedData.tier] || '$50';
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: `Your application has been submitted successfully! To complete your membership, please send ${paymentAmount} to contact@herscape.org. We will review your application and confirm your membership once payment is received.` 
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