const { google } = require('googleapis');
const sheets = google.sheets('v4');

// Authenticate using Google API credentials
async function authenticate() {
  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const authClient = await auth.getClient();
  return authClient;
}

// Function to append form data to the Google Sheet
async function appendToSheet(auth, formData) {
  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = '1DgwzTlg9jwm9-b18RnJjTQwSeUU5ABlA63sLyv8ikbI';
  const range = 'Sheet1!A:E'; // Adjust range based on your columns

  const values = [
    [
      formData.fullName,
      formData.email,
      formData.telegramUsername,
      formData.phoneNumber,
      formData.yearOfCampus,
    ],
  ];

  const resource = {
    values,
  };

  try {
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource,
    });
    console.log(`${result.data.updates.updatedCells} cells appended.`);
  } catch (err) {
    console.error(err);
  }
}

// Example of how you would use this in your backend route
app.post('/submit-form', async (req, res) => {
  const auth = await authenticate();
  const formData = req.body; // Assumes data from the frontend form is sent in the request body

  try {
    await appendToSheet(auth, formData);
    res.status(200).json({ message: 'Data successfully added to Google Sheet' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding data to Google Sheet', error });
  }
});
