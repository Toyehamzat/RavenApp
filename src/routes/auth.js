const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create(email, password);
    res.status(201).json({ 
      message: 'User created successfully', 
      account_number: user.account_number 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await User.authenticate(email, password);
    res.json({ 
      message: 'Login successful', 
      token, 
      account_number: user.account_number 
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;