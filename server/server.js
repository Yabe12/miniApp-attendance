require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const qr = require('qrcode');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Setup routes and controllers
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
