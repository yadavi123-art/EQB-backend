const express = require('express');
const router = express.Router();
const User = require('./schema.js').model("User");
const { v4: uuidv4 } = require('uuid');

/**
 * @swagger
 * /auth/signup:
 *   tags: [Authentication]
 *   post:
 *     summary: signing up
 *     tags: [Authentication]
 *     description: signs up the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 description: The name of the user.
 *               Email:
 *                 type: string
 *                 description: The email address of the user.
 *               phone_no:
 *                 type: string
 *                 description: The phone number of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       500:
 *         description: Error creating user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 */
router.post('/signup', async (req, res) => {
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
});

module.exports = router;
