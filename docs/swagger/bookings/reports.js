/**
 * @swagger
 * tags:
 *   name: Booking Reports
 *   description: API for retrieving booking statistics and reports
 */

/**
 * @swagger
 * /bookings/reports/bookings/total:
 *   get:
 *     summary: Get the total number of bookings
 *     tags: [Booking Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total number of bookings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalBookings:
 *                   type: number
 *                   description: The total count of all bookings.
 *       401:
 *         description: Unauthorized, no token or invalid token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /bookings/reports/bookings/venues:
 *   get:
 *     summary: Get a list of all booked venues with their booking counts
 *     tags: [Booking Reports]
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
