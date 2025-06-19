# Local Development Setup

## The Issue
You're getting a 404 error because Netlify functions don't work in the standard Vite development server. You need to use Netlify's development server instead.

## Solution: Use Netlify Dev

### 1. Install Netlify CLI (if not already installed)
```bash
npm install -g netlify-cli
```

### 2. Start the Development Server
Instead of running `npm run dev`, use:
```bash
netlify dev
```

This will:
- Start your Vite development server on port 5173
- Start the Netlify functions server on port 8888
- Proxy function requests from your frontend to the functions server

### 3. Access Your Functions
Your functions will now be available at:
- `http://localhost:8888/.netlify/functions/submit-join`
- `http://localhost:8888/.netlify/functions/test-env`

### 4. Environment Variables for Local Development
Create a `.env` file in your project root:
```env
BREVO_API_KEY=your_brevo_api_key_here
```

### 5. Testing Locally
1. Start the server: `netlify dev`
2. Open your browser to `http://localhost:8888`
3. Navigate to the join form
4. Submit the form - it should now work!

## Alternative: Test on Production
If you want to test the production deployment:
1. Deploy your changes to Netlify
2. Test at: `https://herscape.org/join`

## Troubleshooting Local Development

### If `netlify dev` doesn't work:
1. Make sure you're logged in: `netlify login`
2. Link your project: `netlify link`
3. Try running: `netlify dev --port 8888`

### If functions still return 404:
1. Check that the functions are in the correct directory: `netlify/functions/`
2. Ensure the function files have the correct exports
3. Restart the `netlify dev` server

### Environment Variables Not Working:
1. Create a `.env` file in your project root
2. Add your `BREVO_API_KEY`
3. Restart the development server

## Development Workflow
1. Make changes to your code
2. Run `netlify dev` to test locally
3. Test the functions work correctly
4. Deploy to production when ready 