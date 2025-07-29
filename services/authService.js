const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * Generate a JWT token for authenticated users
 * @param {Object} user - User object containing id and email
 * @returns {String} JWT token
 */
exports.generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      email: user.Email
    }
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

/**
 * Verify if provided password matches the hashed password
 * @param {String} plainPassword - Plain text password
 * @param {String} hashedPassword - Hashed password from database
 * @returns {Boolean} True if password matches, false otherwise
 */
exports.verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Verify and decode JWT token
 * @param {String} token - JWT token to verify
 * @returns {Object|null} Decoded token payload or null if invalid
 */
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Hash a password
 * @param {String} password - Plain text password
 * @returns {String} Hashed password
 */
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
