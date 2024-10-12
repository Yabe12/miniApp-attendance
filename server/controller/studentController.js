const sheets = require('../config/googleSheetConfig');
const QRCode = require('qrcode');

// Google Sheets Information
const SPREADSHEET_ID = 'your-spreadsheet-id';
const SHEET_NAME = 'Students';

// Register a new student and generate QR code
exports.registerStudent = async (req, res) => {
  const { fullName, email, telegramUsername, phoneNumber, yearOfCampus } = req.body;

  try {
    // Generate a unique QR code using email or phoneNumber
    const qrCodeData = await QRCode.toDataURL(email);  // Email used for generating QR code

    // Save student data in Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:F`,
      valueInputOption: 'RAW',
      resource: {
        values: [[fullName, email, telegramUsername, phoneNumber, yearOfCampus, qrCodeData]],
      },
    });

    res.status(201).json({ message: 'Student registered successfully!', qrCode: qrCodeData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering student.' });
  }
};

// Record attendance based on scanned QR code
exports.markAttendance = async (req, res) => {
  const { scannedQR } = req.body;

  try {
    // Fetch students from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:F`,
    });

    const students = response.data.values;
    const student = students.find(row => row[5] === scannedQR);  // Compare QR code data

    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Mark attendance in a new sheet or column (assuming column G is attendance)
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!G:G`,
      valueInputOption: 'RAW',
      resource: {
        values: [[new Date().toLocaleString()]],  // Record attendance time
      },
    });

    res.status(200).json({ message: 'Attendance recorded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error recording attendance.' });
  }
};
