const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./schema.js').model('User');
const auth = require('./middleware/auth.js'); // Assuming auth middleware is in middleware/auth.js

/**
 * @swagger
 * tags:
 *   name: User Profile
 *   description: API for users to manage their own profile
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get authenticated user's profile
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized, no token or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update authenticated user's own credentials
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Email:
 *                 type: string
 *                 format: email
 *               phone_no:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's new password (optional)
 *     responses:
 *       200:
 *         description: User credentials updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized, no token or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/profile', auth, async (req, res) => {
  try {
    const { Name, Email, phone_no, password } = req.body;
    const updateFields = {};

    if (Name) updateFields.Name = Name;
    if (Email) updateFields.Email = Email;
    if (phone_no) updateFields.phone_no = phone_no;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateFields,
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User credentials updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
