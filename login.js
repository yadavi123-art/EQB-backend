const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./schema.js').model('User');

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

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Make sure JWT_SECRET is defined in your .env file
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ message: 'Login successfully'});
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
