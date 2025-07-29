const express = require('express');
const router = express.Router();
const User = require('./schema.js').model('User');
const authService = require('./services/authService');

// User Login
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body; // identifier can be email or phone_no

  try {
    // Find user by email or phone number
    const user = await User.findOne({
      $or: [{ Email: identifier }, { phone_no: identifier }]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords using auth service
    const isMatch = await authService.verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token using auth service
    const token = authService.generateToken(user);
    res.json({ message: 'Login successfully', token });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
