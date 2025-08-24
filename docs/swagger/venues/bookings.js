/**
 * @swagger
 * /venues/{hall_id}/bookings:
 *   get:
 *     summary: Get all bookings for a specific venue
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: hall_id
 *         required: true
 *         description: ID of the hall to retrieve bookings for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   booking_id:
 *                     type: string
 *                     description: Unique booking identifier
 *                   user_id:
 *                     type: string
 *                     description: ID of the user who made the booking
 *                   hall_id:
 *                     type: string
 *                     description: ID of the booked venue
 *                   booking_dates:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: date
 *                     description: Array of booked dates
 *                   status:
 *                     type: string
 *                     description: Booking status
 *                   purpose:
 *                     type: string
 *                     description: Purpose of the booking
 *                   guest_quantity:
 *                     type: number
 *                     description: Number of guests
 *                   addons:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Additional services booked
 *                   special_requests:
 *                     type: string
 *                     description: Special requests from the customer
 *                   contact_name:
 *                     type: string
 *                     description: Contact person name
 *                   contact_email:
 *                     type: string
 *                     description: Contact email
 *                   contact_phone:
 *                     type: string
 *                     description: Contact phone number
 *       500:
 *         description: Server error
 */
