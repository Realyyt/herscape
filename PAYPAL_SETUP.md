# PayPal Integration Setup Guide

## Environment Variables Required

Add the following environment variables to your `.env.local` file:

```bash
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
```

## PayPal Developer Account Setup

1. **Create a PayPal Developer Account**
   - Go to [developer.paypal.com](https://developer.paypal.com)
   - Sign up for a developer account

2. **Create an App**
   - Navigate to "My Apps & Credentials"
   - Click "Create App"
   - Choose "Business" app type
   - Give your app a name (e.g., "Herscape Founding Circle")

3. **Get Your Credentials**
   - Copy the Client ID and Client Secret
   - For development, use the Sandbox credentials
   - For production, use the Live credentials

4. **Configure Webhooks (Optional but Recommended)**
   - In your PayPal app settings, add a webhook URL
   - Use: `https://yourdomain.com/api/paypal`
   - Select these events:
     - `PAYMENT.CAPTURE.COMPLETED`
     - `PAYMENT.CAPTURE.DENIED`

## Testing

- **Sandbox Mode**: Use PayPal sandbox accounts for testing
- **Live Mode**: Switch to live credentials for production

## Security Notes

- Never commit your PayPal credentials to version control
- Use environment variables for all sensitive data
- Implement webhook signature verification in production
- Consider using PayPal's IPN (Instant Payment Notification) for additional security

## Features Implemented

✅ PayPal payment buttons on success page
✅ Payment verification through backend API
✅ Webhook handling for payment events
✅ Updated email templates (removed bank account info)
✅ Success/failure status handling
✅ Secure payment processing

## Next Steps

1. Set up your PayPal developer account
2. Add the environment variables
3. Test the payment flow in sandbox mode
4. Deploy and test in production
5. Set up webhooks for production use 