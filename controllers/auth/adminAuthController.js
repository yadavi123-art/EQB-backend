const { Admin } = require('../../schema.js');
const authService = require('../../services/authService');
const { v4: uuidv4 } = require('uuid');

// Admin Login
exports.login = async (req, res) => {
  try {
    const { Email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ Email });
    if (!admin) {
      console.log('Admin not found for email:', Email);
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    console.log('Admin found:', admin.Email);
    console.log('Provided password (plain):', password);
    console.log('Stored hashed password:', admin.Password);

    // Use authService to verify password instead of bcrypt directly
    const isMatch = await authService.verifyPassword(password, admin.Password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token using auth service
    const token = authService.generateToken({
      id: admin.id,
      Email: admin.Email,
      isAdmin: true // Add an admin flag to differentiate from regular users
    });

    // Return token along with success message
    res.status(200).json({ 
      message: 'Admin logged in successfully', 
      admin: {
        id: admin.id,
        Email: admin.Email,
        Name: admin.Name
      },
      token
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Admin Register
exports.register = async (req, res) => {
  try {
    const { Name, phone_no, Email, Password } = req.body;

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
      phone_no,
      Email,
      Password,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
  } catch (error) {
    console.error('Error during admin registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
