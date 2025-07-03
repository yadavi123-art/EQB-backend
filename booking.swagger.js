/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API to manage venue bookings
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - hall_id
 *               - booking_dates
 *               - status
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user making the booking.
 *               hall_id:
 *                 type: string
 *                 description: The ID of the hall being booked.
 *               booking_dates:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: date
 *                 description: An array of dates for the booking (YYYY-MM-DD format).
 *               status:
 *                 type: string
 *                 enum: [booked, canceled]
 *                 description: The status of the booking.
 *     responses:
 *       201:
 *         description: Booking created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Bad request, e.g., venue already booked on a specific date.
 *       500:
 *         description: Server error.
 * /bookings/user/{user_id}:
 *   get:
 *     summary: Get bookings by user ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the user to retrieve bookings for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a list of bookings for the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Server error.
 * /bookings/hall/{hall_id}:
 *   get:
 *     summary: Get bookings by hall ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: hall_id
 *         required: true
 *         description: ID of the hall to retrieve bookings for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a list of bookings for the specified hall.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Server error.
 *
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         booking_id:
 *           type: string
 *           description: The unique ID of the booking.
 *         user_id:
 *           type: string
 *           description: The ID of the user who made the booking.
 *         hall_id:
 *           type: string
 *           description: The ID of the hall that was booked.
 *         booking_dates:
 *           type: array
 *           items:
 *             type: string
 *             format: date
 *           description: An array of dates for which the hall is booked.
 *         status:
 *           type: string
 *           enum: [booked, canceled]
 *           description: The status of the booking.
 */
