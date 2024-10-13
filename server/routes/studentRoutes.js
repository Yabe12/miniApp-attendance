const express = require('express');
const { registerStudent, attendanceByQr } = require('../controllers/studentController');
const router = express.Router();

// Register student and generate QR code
router.post('/register', registerStudent);

// Scan QR code for attendance
router.get('/attendance/:qrCodeData', attendanceByQr);

module.exports = router;
