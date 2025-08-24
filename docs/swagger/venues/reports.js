/**
 * @swagger
 * /venues/reports/booked-venues:
 *   get:
 *     summary: Get a list of all booked venues with their booking counts
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of booked venues retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the booked venue.
 *                   hall_name:
 *                     type: string
 *                     description: The name of the booked venue.
 *                   bookingCount:
 *                     type: number
 *                     description: The number of times this venue has been booked.
 *       401:
 *         description: Unauthorized, no token or invalid token
 *       500:
 *         description: Internal server error
 */
