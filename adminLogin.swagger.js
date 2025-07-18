/**
 * @swagger
 * /auth/admin/login:
 *   post:
 *     summary: Log in an admin
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *               - password
 *             properties:
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: The email of the admin.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the admin account.
 *     responses:
 *       200:
 *         description: Admin logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin logged in successfully
 *                 admin_id:
 *                   type: string
 *                   description: The ID of the logged-in admin.
 *       400:
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials.
 *       500:
 *         description: Internal Server Error.
 */
