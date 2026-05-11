const serverless = require('serverless-http');
const express = require('express');
const { app, connectDB } = require('../server');

// Create a wrapper to handle the Netlify function route prefix
const netlifyApp = express();

// When deployed to Netlify, requests will hit /.netlify/functions/api/...
// We mount the original app at this base path so routes still match
netlifyApp.use('/.netlify/functions/api', app);

module.exports.handler = async (event, context) => {
  // Ensure DB connection is active before handling requests
  await connectDB();
  const handler = serverless(netlifyApp);
  return handler(event, context);
};
