const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const sheets = google.sheets('v4');

// Load Google API credentials from your environment
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, './service-account-file.json'), // Google service account credentials
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const getSheetClient = async () => {
  const client = await auth.getClient();
  return sheets.spreadsheets;
};

module.exports = {
  getSheetClient,
  spreadsheetId: process.env.spreadsheetId, // Spreadsheet ID from .env
};
