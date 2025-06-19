exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const hasApiKey = !!process.env.RESEND_API_KEY;
    const apiKeyLength = process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : 0;
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        hasApiKey,
        apiKeyLength,
        message: hasApiKey 
          ? `RESEND_API_KEY is configured (${apiKeyLength} characters)` 
          : 'RESEND_API_KEY is NOT configured'
      })
    };
  } catch (error) {
    console.error('Test function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
}; 