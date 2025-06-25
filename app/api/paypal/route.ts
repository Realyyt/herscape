import { type NextRequest, NextResponse } from 'next/server';

// PayPal API configuration
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

// Get PayPal access token
async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

// Verify PayPal payment
async function verifyPayment(orderID: string) {
  const accessToken = await getPayPalAccessToken();
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

// Capture PayPal payment
async function capturePayment(orderID: string) {
  const accessToken = await getPayPalAccessToken();
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderID, action } = body;

    if (!orderID) {
      return NextResponse.json({ success: false, message: 'Order ID is required.' }, { status: 400 });
    }

    switch (action) {
      case 'verify':
        const orderDetails = await verifyPayment(orderID);
        return NextResponse.json({ success: true, data: orderDetails });

      case 'capture':
        const captureResult = await capturePayment(orderID);
        return NextResponse.json({ success: true, data: captureResult });

      default:
        return NextResponse.json({ success: false, message: 'Invalid action.' }, { status: 400 });
    }
  } catch (error) {
    console.error('PayPal API error:', error);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

// Handle PayPal webhooks
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Verify webhook signature (you should implement this in production)
    // const isValid = verifyWebhookSignature(req.headers, body);
    // if (!isValid) {
    //   return NextResponse.json({ success: false, message: 'Invalid webhook signature.' }, { status: 401 });
    // }

    const { event_type, resource } = body;

    switch (event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        // Handle successful payment
        console.log('Payment completed:', resource);
        // Here you would update your database, send confirmation emails, etc.
        break;

      case 'PAYMENT.CAPTURE.DENIED':
        // Handle failed payment
        console.log('Payment denied:', resource);
        break;

      default:
        console.log('Unhandled webhook event:', event_type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ success: false, message: 'Webhook processing failed.' }, { status: 500 });
  }
} 