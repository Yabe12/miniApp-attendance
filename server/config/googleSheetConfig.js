const { google } = require('googleapis');
const keys = require('./path-to-your-google-credentials.json');  // Download the credentials JSON from Google Cloud

const auth = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']  // Google Sheets scope
);

const sheets = google.sheets({ version: 'v4', auth });

module.exports = sheets;
