require('dotenv').config(); // Load environment variables

const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000; // Get port from env file or default to 5000

app.use(express.json());
app.use(cors());

// Google Sheets API setup
const sheets = google.sheets('v4');
const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID, 
  process.env.GOOGLE_CLIENT_SECRET, 
  process.env.GOOGLE_REDIRECT_URI
);

auth.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Endpoint for student registration
app.post('/register', async (req, res) => {
  const { fullName, email, telegramUsername, phoneNumber, yearOfCampus } = req.body;

  // Generate a unique QR code for the student
  const studentId = Math.random().toString(36).substring(7); // Unique ID generation

  try {
    // Save student data in Google Sheets
    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID, // Google Sheets ID from .env
      range: 'Sheet1!A:F', // Assuming the first sheet, adjust the range accordingly
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[fullName, email, telegramUsername, phoneNumber, yearOfCampus, studentId]],
      },
    });

    // Respond with success and QR code information
    res.status(200).json({
      message: 'Student registered successfully',
      qrCodeData: studentId, // Return this data for generating the QR code on the frontend
    });
  } catch (error) {
    console.error('Error registering student: ', error);
    res.status(500).json({ error: 'Error registering student' });
  }
});

// Attendance endpoint using QR code scan
app.post('/attendance', async (req, res) => {
  const { qrCodeData } = req.body;

  try {
    // Retrieve the student's information from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:F',
    });

    const rows = response.data.values;

    if (rows.length) {
      const studentRow = rows.find(row => row[5] === qrCodeData);

      if (studentRow) {
        // Mark attendance
        const attendanceTime = new Date().toLocaleString();
        await sheets.spreadsheets.values.append({
          auth,
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'Attendance!A:B', // Assume another sheet for attendance
          valueInputOption: 'USER_ENTERED',
          resource: {
            values: [[studentRow[0], attendanceTime]], // Full name and attendance time
          },
        });

        return res.status(200).json({ message: 'Attendance marked successfully' });
      } else {
        return res.status(404).json({ error: 'Student not found' });
      }
    } else {
      return res.status(404).json({ error: 'No data found' });
    }
  } catch (error) {
    console.error('Error marking attendance: ', error);
    res.status(500).json({ error: 'Error marking attendance' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
