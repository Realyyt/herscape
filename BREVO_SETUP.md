# Brevo Email Integration Setup

This project uses Brevo (formerly Sendinblue) for sending emails from the Join form.

## Setup Instructions

### 1. Get Your Brevo API Key

1. Go to [Brevo Dashboard](https://app.brevo.com/settings/keys/api)
2. Create a new API key or use an existing one
3. Copy the API key

### 2. Environment Variables

Add the following environment variable to your deployment platform (Netlify, Vercel, etc.):

```
BREVO_API_KEY=your_brevo_api_key_here
```

### 3. Netlify Setup

If deploying to Netlify:

1. Go to your Netlify dashboard
2. Navigate to Site settings > Environment variables
3. Add `BREVO_API_KEY` with your Brevo API key value
4. Redeploy your site

### 4. Email Configuration

The form is configured to:
- **Sender**: contact@herscape.org
- **Recipient**: contact@herscape.org
- **Reply-To**: The applicant's email address

### 5. Testing

To test the email functionality:
1. Fill out the Join form
2. Submit the form
3. Check the contact@herscape.org inbox for the application email

## Email Template

The email includes:
- Applicant's full name, email, and phone
- Selected membership tier
- Company and LinkedIn (if provided)
- Personal message (if provided)
- Styled HTML template with Herscape branding

## Troubleshooting

If emails are not being sent:
1. Verify your Brevo API key is correct
2. Check that the environment variable is set correctly
3. Review Netlify function logs for any errors
4. Ensure contact@herscape.org is a verified sender in Brevo 