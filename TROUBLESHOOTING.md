# Troubleshooting the Submit-Join Function

## Current Issue: 500 Internal Server Error

The `submit-join` function is returning a 500 error. Here are the most likely causes and solutions:

## 1. Missing BREVO_API_KEY Environment Variable

**Most Common Cause**: The `BREVO_API_KEY` environment variable is not set in your Netlify deployment.

### How to Fix:

1. **Get your Brevo API Key**:
   - Go to [Brevo Dashboard](https://app.brevo.com/settings/keys/api)
   - Create a new API key or copy an existing one

2. **Set the Environment Variable in Netlify**:
   - Go to your Netlify dashboard
   - Navigate to Site settings > Environment variables
   - Add a new variable:
     - **Key**: `BREVO_API_KEY`
     - **Value**: Your Brevo API key
   - Click "Save"
   - Redeploy your site

3. **Test the Configuration**:
   - Visit: `https://herscape.org/.netlify/functions/test-env`
   - This will tell you if the API key is properly configured

## 2. Invalid or Expired API Key

If the API key is set but still getting errors:

1. **Verify the API Key**:
   - Check if the key is still valid in your Brevo dashboard
   - Ensure it has the necessary permissions for sending emails

2. **Test the API Key**:
   - Use the Brevo API documentation to test your key
   - Check if there are any rate limits or restrictions

## 3. Sender Email Verification

Brevo requires sender emails to be verified:

1. **Verify contact@herscape.org**:
   - Go to your Brevo dashboard
   - Navigate to Senders & IP
   - Add and verify `contact@herscape.org` as a sender

## 4. Check Function Logs

To see detailed error logs:

1. **In Netlify Dashboard**:
   - Go to Functions tab
   - Click on `submit-join`
   - Check the logs for specific error messages

2. **Common Log Messages**:
   - `BREVO_API_KEY environment variable is not set` → Missing API key
   - `Brevo API error: ...` → API-related issues
   - `Form submission error: ...` → General function errors

## 5. Testing Steps

1. **Test Environment Variable**:
   ```
   GET https://herscape.org/.netlify/functions/test-env
   ```

2. **Test Form Submission**:
   - Fill out the join form
   - Submit and check browser console for errors
   - Check Netlify function logs

## 6. Recent Changes Made

I've added better error handling to the function:

- ✅ Checks if `BREVO_API_KEY` is set before making API calls
- ✅ Added detailed logging for debugging
- ✅ Better error messages for different failure scenarios
- ✅ Created a test function to verify configuration

## 7. Next Steps

1. **Set the BREVO_API_KEY environment variable** (most likely fix)
2. **Redeploy the site** after setting the environment variable
3. **Test the form submission** again
4. **Check the logs** if issues persist

## Support

If you continue to have issues after following these steps:

1. Check the Netlify function logs for specific error messages
2. Verify your Brevo account and API key permissions
3. Test the API key directly with Brevo's API documentation 