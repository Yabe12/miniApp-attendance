const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use the student routes
app.use('/api', studentRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});