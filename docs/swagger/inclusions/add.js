/**
 * @swagger
 * /inclusions:
 *   post:
 *     summary: Add a new inclusion
 *     tags: [Inclusions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *             example:
 *               name: Photography
 *               description: Professional photography services.
 *               category: services
 *     responses:
 *       201:
 *         description: Inclusion added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inclusion'
 *       500:
 *         description: Internal Server Error
 */
