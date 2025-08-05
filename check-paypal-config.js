#!/usr/bin/env node

// Load environment variables from .env.local
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local file
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  envLines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=');
        process.env[key] = value;
      }
    }
  });
}

// Simple script to check PayPal configuration
console.log('🔍 Checking PayPal Configuration...\n');

// Check environment variables
const envVars = {
  'NEXT_PUBLIC_PAYPAL_CLIENT_ID': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  'PAYPAL_CLIENT_ID': process.env.PAYPAL_CLIENT_ID,
  'PAYPAL_CLIENT_SECRET': process.env.PAYPAL_CLIENT_SECRET,
  'NODE_ENV': process.env.NODE_ENV
};

console.log('Environment Variables:');
Object.entries(envVars).forEach(([key, value]) => {
  const status = value ? '✅' : '❌';
  const displayValue = key.includes('SECRET') ? (value ? '***SET***' : 'NOT SET') : value || 'NOT SET';
  console.log(`  ${status} ${key}: ${displayValue}`);
});

// Determine PayPal mode
const isProduction = process.env.NODE_ENV === 'production';
const paypalUrl = isProduction ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

console.log(`\n🌐 PayPal Mode: ${isProduction ? 'LIVE' : 'SANDBOX'}`);
console.log(`🔗 PayPal API URL: ${paypalUrl}`);

// Check if credentials are configured
const hasClientId = !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const hasSecret = !!process.env.PAYPAL_CLIENT_SECRET;

if (!hasClientId || !hasSecret) {
  console.log('\n❌ ISSUE: PayPal credentials are not properly configured!');
  console.log('Please create a .env.local file with:');
  console.log('NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_live_client_id');
  console.log('PAYPAL_CLIENT_ID=your_live_client_id');
  console.log('PAYPAL_CLIENT_SECRET=your_live_client_secret');
  console.log('NODE_ENV=production');
} else if (!isProduction) {
  console.log('\n⚠️  WARNING: Running in SANDBOX mode. Payments will not appear in your live PayPal account.');
  console.log('To use live payments, set NODE_ENV=production in your .env.local file');
} else {
  console.log('\n✅ Configuration looks good for live payments!');
}

console.log('\n💡 Tips:');
console.log('- Make sure you\'re using LIVE credentials from PayPal Developer Dashboard');
console.log('- Clear your browser cache if you still see sandbox popup');
console.log('- Check PayPal Developer Dashboard for webhook configuration'); 