const { google } = require('googleapis');
const qr = require('qrcode');
const path = require('path');
const { clientEmail, privateKey, spreadsheetId } = require('../config/googleSheetsConfig');

// Google Sheets API setup
const auth = new google.auth.JWT(
  clientEmail,
  null,
  privateKey,
  ['https://www.googleapis.com/auth/spreadsheets']
);
const sheets = google.sheets({ version: 'v4', auth });

// Register student and generate QR code
exports.registerStudent = async (req, res) => {
  const { fullName, email, telegramUsername, phoneNumber, yearOfCampus } = req.body;

  try {
    // Save the student's information to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E', // Adjust range as needed
      valueInputOption: 'RAW',
      resource: {
        values: [[fullName, email, telegramUsername, phoneNumber, yearOfCampus]],
      },
    });

    // Generate a unique QR code for the student
    const qrCodeUrl = `${process.env.QR_CODE_BASE_URL}/${fullName}-${Date.now()}`;
    const qrCodePath = path.join(__dirname, `../qrcodes/${fullName}-${Date.now()}.png`);

    // Generate QR code and save it
    await qr.toFile(qrCodePath, qrCodeUrl);

    res.status(201).json({
      message: 'Student registered successfully!',
      qrCodeUrl,
    });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ error: 'Failed to register student' });
  }
};

// Attendance by scanning QR code
exports.attendanceByQr = async (req, res) => {
  const qrCodeData = req.params.qrCodeData;
  try {
    // Check student in Google Sheets based on QR code data
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:E',
    });

    const studentRow = data.values.find(row => row[0] === qrCodeData);
    if (!studentRow) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Mark attendance in Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!F:F', // Assuming column F is for attendance
      valueInputOption: 'RAW',
      resource: {
        values: [[new Date().toLocaleString()]],
      },
    });

    res.json({ message: 'Attendance recorded successfully!' });
  } catch (error) {
    console.error('Error recording attendance:', error);
    res.status(500).json({ error: 'Failed to record attendance' });
  }
};
