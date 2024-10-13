const { google } = require('googleapis');
const path = require('path');

// Load the credentials from the JSON file
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, './credentials.json'), // Path to your service account key file
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Function to write data to Google Sheets
const writeSheetData = async (spreadsheetId, range, values) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const resource = {
    values,
  };

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource,
  });

  console.log(`${response.data.updates.updatedCells} cells updated.`);
};

// Example Usage
const SPREADSHEET_ID = '1DgwzTlg9jwm9-b18RnJjTQwSeUU5ABlA63sLyv8ikbI' ;// Replace with your spreadsheet ID
const RANGE = 'Sheet1!A:E'; // Adjust range to the columns you need (A:E for five columns)

// Sample form data (replace this with your actual form data)
const formData = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  telegramUsername: '@johndoe',
  phoneNumber: '1234567890',
  yearOfCampus: '2024',
};

// Prepare the values to be inserted
const values = [
  [
    formData.fullName,
    formData.email,
    formData.telegramUsername,
    formData.phoneNumber,
    formData.yearOfCampus,
  ],
];

// Write Data to Google Sheets
writeSheetData(SPREADSHEET_ID, RANGE, values);
