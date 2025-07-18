const express = require('express');
const router = express.Router();
const Admin = require('./schema.js').model("Admin"); // Assuming Admin schema is defined in schema.js
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

router.post('/admin/register', async (req, res) => {
  try {
    const { Name, phone_no, Email, password } = req.body;

    // Check if admin with the given email already exists
    const existingAdmin = await Admin.findOne({ Email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists.' });
    }

    // Generate a unique admin_id
    const admin_id = uuidv4();

    const newAdmin = new Admin({
      admin_id,
      Name,
      phone_no, // Assuming phone_no is part of the Admin schema
      Email,
      Password: password, // The pre-save hook in schema.js will hash this
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
  } catch (error) {
    console.error('Error during admin registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
