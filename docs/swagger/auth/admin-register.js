/**
 * @swagger
 * /auth/admin/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Name
 *               - phone_no
 *               - Email
 *               - password
 *             properties:
 *               Name:
 *                 type: string
 *                 description: The name of the admin.
 *               phone_no:
 *                 type: string
 *                 description: The phone number of the admin.
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: The email of the admin.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the admin account.
 *     responses:
 *       201:
 *         description: Admin registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin registered successfully
 *                 admin:
 *                   type: object
 *                   properties:
 *                     admin_id:
 *                       type: string
 *                     Name:
 *                       type: string
 *                     Email:
 *                       type: string
 *                     phone_no:
 *                       type: string
 *       400:
 *         description: Admin with this email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin with this email already exists.
 *       500:
 *         description: Internal Server Error.
 */
