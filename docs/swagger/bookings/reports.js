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
 * # Note: Booked venues report endpoint has been moved to /venues/reports/booked-venues
 * # See docs/swagger/venues/reports.js for the updated documentation
 */
