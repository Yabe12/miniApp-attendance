const express = require('express');
const router = express.Router();
const { registerStudent, takeAttendance } = require('../controller/studentController');

// POST route for student registration
router.post('/register', registerStudent);

// POST route for taking attendance
router.post('/attendance', takeAttendance);

module.exports = router;
