const { getSheetClient, spreadsheetId } = require('../config/index');
const { google } = require('googleapis');

// Helper function to append data to Google Sheets
const appendDataToSheet = async (values) => {
  const sheets = await getSheetClient();
  await sheets.values.append({
    spreadsheetId,
    range: 'Sheet1!A:F', // Update this with your Google Sheet's range
    valueInputOption: 'RAW',
    resource: {
      values: [values],
    },
  });
};

// Register a student
const registerStudent = async (req, res) => {
  const { fullName, email, telegramUsername, phoneNumber, yearOfCampus } = req.body;

  // Validate the input
  if (!fullName || !email || !telegramUsername || !phoneNumber || !yearOfCampus) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Append the student data to Google Sheets
    await appendDataToSheet([fullName, email, telegramUsername, phoneNumber, yearOfCampus, new Date().toISOString()]);

    return res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error registering student:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Mark attendance
const takeAttendance = async (req, res) => {
  const { qrCodeData } = req.body;

  if (!qrCodeData) {
    return res.status(400).json({ error: 'QR code data is required' });
  }

  try {
    // Append attendance data to Google Sheets
    await appendDataToSheet([qrCodeData, 'Present', new Date().toISOString()]);

    return res.status(201).json({ message: 'Attendance marked successfully!' });
  } catch (error) {
    console.error('Error marking attendance:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerStudent, takeAttendance };
