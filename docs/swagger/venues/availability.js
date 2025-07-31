/**
 * @swagger
 * tags:
 *   name: Availability
 *   description: API to check venue availability
 */

/**
 * @swagger
 * /availability/{hall_id}/{date}:
 *   get:
 *     summary: Check venue availability for a specific date
 *     tags: [Availability]
 *     parameters:
 *       - in: path
 *         name: hall_id
 *         required: true
 *         description: ID of the hall to check availability for.
 *         schema:
 *           type: string
 *       - in: path
 *         name: date
 *         required: true
 *         description: Date to check availability (YYYY-MM-DD format).
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Returns availability status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available:
 *                   type: boolean
 *                   description: True if available, false if booked.
 *                 message:
 *                   type: string
 *                   description: A descriptive message about availability.
 *       500:
 *         description: Server error.
 */
