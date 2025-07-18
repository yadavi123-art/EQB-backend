const express = require('express');
const router = express.Router();
const Admin = require('./schema.js').model("Admin"); // Assuming Admin schema is defined in schema.js
const bcrypt = require('bcrypt');

router.post('/admin/login', async (req, res) => {
  try {
    const { Email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ Email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, admin.Password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'Admin logged in successfully', admin_id: admin.admin_id });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
