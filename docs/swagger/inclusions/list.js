/**
 * @swagger
 * /inclusions:
 *   get:
 *     summary: Get all inclusions
 *     tags: [Inclusions]
 *     responses:
 *       200:
 *         description: A list of all inclusions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inclusion'
 *       500:
 *         description: Internal Server Error
 */
