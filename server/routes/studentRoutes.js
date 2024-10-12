const express = require('express');
const router = express.Router();
const { registerStudent, markAttendance } = require('../controllers/studentController');

// POST /api/register
router.post('/register', registerStudent);

// POST /api/attendance
router.post('/attendance', markAttendance);

module.exports = router;
