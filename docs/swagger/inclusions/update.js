/**
 * @swagger
 * /inclusions/{id}:
 *   put:
 *     summary: Update an inclusion by ID
 *     tags: [Inclusions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The inclusion ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inclusion'
 *     responses:
 *       200:
 *         description: Inclusion updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inclusion'
 *       404:
 *         description: Inclusion not found.
 *       500:
 *         description: Internal Server Error
 */
