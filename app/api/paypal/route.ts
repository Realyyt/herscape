import { type NextRequest, NextResponse } from 'next/server';

// PayPal API configuration
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

// Debug logging
console.log('PayPal Configuration:', {
  NODE_ENV: process.env.NODE_ENV,
  PAYPAL_BASE_URL,
  HAS_CLIENT_ID: !!PAYPAL_CLIENT_ID,
  HAS_CLIENT_SECRET: !!PAYPAL_CLIENT_SECRET
});

// Get PayPal access token
async function getPayPalAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('PayPal credentials not configured. Please check your environment variables.');
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal token error:', response.status, errorText);
    throw new Error(`Failed to get PayPal access token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Verify PayPal payment
async function verifyPayment(orderID: string) {
  console.log('Verifying payment for order:', orderID);
  const accessToken = await getPayPalAccessToken();
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal verification error:', response.status, errorText);
    throw new Error(`Failed to verify payment: ${response.status}`);
  }

  const result = await response.json();
  console.log('Payment verification result:', result);
  return result;
}

// Capture PayPal payment
async function capturePayment(orderID: string) {
  console.log('Capturing payment for order:', orderID);
  const accessToken = await getPayPalAccessToken();
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PayPal capture error:', response.status, errorText);
    throw new Error(`Failed to capture payment: ${response.status}`);
  }

  const result = await response.json();
  console.log('Payment capture result:', result);
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderID, action } = body;

    console.log('PayPal API request:', { orderID, action });

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
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'An unexpected error occurred.',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 });
  }
}

// Handle PayPal webhooks
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    
    console.log('PayPal webhook received:', {
      event_type: body.event_type,
      resource_id: body.resource?.id
    });
    
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