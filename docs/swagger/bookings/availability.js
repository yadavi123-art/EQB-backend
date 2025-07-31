/**
 * @swagger
 * /bookings/availability/{hall_id}/{date}:
 *   get:
 *     summary: Check venue availability for a specific date
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: hall_id
 *         required: true
 *         description: ID of the hall to check availability for
 *         schema:
 *           type: string
 *       - in: path
 *         name: date
 *         required: true
 *         description: Date to check availability for (YYYY-MM-DD format)
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Availability status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available:
 *                   type: boolean
 *                   description: Whether the venue is available on the specified date
 *                 message:
 *                   type: string
 *                   description: Additional information about the availability
 *       404:
 *         description: Hall not found
 *       500:
 *         description: Server error
 */
