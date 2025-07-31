/**
 * @swagger
 * /inclusions/{id}:
 *   delete:
 *     summary: Delete an inclusion by ID
 *     tags: [Inclusions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The inclusion ID
 *     responses:
 *       200:
 *         description: Inclusion deleted successfully.
 *       404:
 *         description: Inclusion not found.
 *       500:
 *         description: Internal Server Error
 */
