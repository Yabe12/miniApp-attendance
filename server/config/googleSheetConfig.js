module.exports = {
  clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fix newline issue with private key
  spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
};
