const { User } = require('../../schema.js');
const authService = require('../../services/authService');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// User Login
exports.login = async (req, res) => {
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
    res.json({ message: 'Login successfully', token, user: user });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// User Signup
exports.signup = async (req, res) => {
  try {
    const { Name, Email, phone_no, password } = req.body;
    const user_id = uuidv4();

    const newUser = new User({
      user_id,
      Name,
      Email,
      phone_no,
      password
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ Email: email });

    if (!user) {
      return res.status(404).json({ message: 'User with that email does not exist.' });
    }

    // Generate a reset token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const mailOptions = {
      to: user.Email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
            `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
            `http://${req.headers.host}/auth/reset-password/${token}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('There was an error: ', err);
        return res.status(500).json({ message: 'Error sending email.' });
      }
      res.status(200).json({ message: 'Password reset email sent.' });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Your password has been reset.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Logout
exports.logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};
