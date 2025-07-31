/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Name
 *               - Email
 *               - phone_no
 *               - password
 *             properties:
 *               Name:
 *                 type: string
 *                 description: User's full name
 *                 example: John Doe
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: user@example.com
 *               phone_no:
 *                 type: string
 *                 description: User's phone number
 *                 example: +1234567890
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *                 example: mysecretpassword
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
 *                   example: User created successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating user
 */
