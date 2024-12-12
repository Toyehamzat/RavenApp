// src/app.js
require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const depositRoutes = require('./routes/deposit');
const transactionRoutes = require('./routes/transaction');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/webhook', depositRoutes);
app.use('/transaction',transactionRoutes)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Click to open: http://localhost:${PORT}`);
});

module.exports = app;