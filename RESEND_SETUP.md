# Resend Email Integration Setup

This project now uses Resend for sending emails from the Join form. Resend is free, reliable, and easy to set up.

## Why Resend?

- ✅ **Free tier**: 3,000 emails/month
- ✅ **Simple setup**: Just need an API key
- ✅ **Great deliverability**: Excellent email delivery rates
- ✅ **No SMTP activation required**: Works immediately
- ✅ **Modern API**: Clean and easy to use

## Setup Instructions

### 1. Create a Resend Account

1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. After signing up, go to the [API Keys section](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name like "Herscape Website"
4. Copy the API key (starts with `re_`)

### 3. Verify Your Domain (Optional but Recommended)

1. Go to [Domains section](https://resend.com/domains)
2. Add your domain: `herscape.org`
3. Follow the DNS verification steps
4. This improves deliverability

### 4. Environment Variables

#### For Local Development:
Create a `.env` file in your project root:
```env
RESEND_API_KEY=re_your_api_key_here
```

#### For Netlify Production:
1. Go to your Netlify dashboard
2. Navigate to Site settings > Environment variables
3. Add a new variable:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Your Resend API key
4. Click "Save"
5. Redeploy your site

### 5. Test the Setup

1. **Local testing**:
   ```bash
   netlify dev
   ```
   Then visit: `http://localhost:8888/.netlify/functions/test-env`

2. **Production testing**:
   Visit: `https://herscape.org/.netlify/functions/test-env`

### 6. Email Configuration

The form is configured to:
- **From**: contact@herscape.org
- **To**: contact@herscape.org
- **Reply-To**: The applicant's email address

## Migration from Brevo

If you were previously using Brevo:

1. **Remove old environment variable**:
   - Delete `BREVO_API_KEY` from Netlify environment variables
   - Remove from local `.env` file

2. **Add new environment variable**:
   - Add `RESEND_API_KEY` with your Resend API key

3. **Redeploy**:
   - Deploy the updated code to Netlify

## Troubleshooting

### Common Issues:

1. **"RESEND_API_KEY is NOT configured"**:
   - Check that the environment variable is set correctly
   - Restart your development server

2. **"Unauthorized" error**:
   - Verify your API key is correct
   - Make sure you copied the full key (starts with `re_`)

3. **Email not sending**:
   - Check the function logs in Netlify dashboard
   - Verify your domain is properly configured

### Testing Steps:

1. **Test API Key**:
   ```
   GET https://herscape.org/.netlify/functions/test-env
   ```

2. **Test Form Submission**:
   - Fill out the join form
   - Submit and check for success message
   - Check your email inbox

## Benefits of Resend

- **No activation required**: Works immediately after signup
- **Better deliverability**: Modern infrastructure
- **Simple pricing**: Clear free tier limits
- **Great documentation**: Easy to implement
- **Reliable**: Used by many companies

## Support

If you need help:
1. Check [Resend documentation](https://resend.com/docs)
2. Review Netlify function logs
3. Test with the provided test endpoint 