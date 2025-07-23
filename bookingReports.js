const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');
const Venue = mongoose.model('Venue');
const auth = require('./middleware/auth.js'); // Assuming auth middleware is in middleware/auth.js

/**
 * @swagger
 * tags:
 *   name: Booking Reports
 *   description: API for retrieving booking statistics and reports
 */

/**
 * @swagger
 * /reports/bookings/total:
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
router.get('/bookings/total', auth, async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    res.status(200).json({ totalBookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

/**
 * @swagger
 * /reports/bookings/venues:
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
router.get('/bookings/venues', auth, async (req, res) => {
  try {
    const bookedVenues = await Booking.aggregate([
      {
        $group: {
          _id: '$hall_id',
          bookingCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'venues', // The collection name for Venue model
          localField: '_id',
          foreignField: 'hall_name', // Assuming hall_id in Booking refers to hall_name in Venue
          as: 'venueDetails'
        }
      },
      {
        $unwind: '$venueDetails'
      },
      {
        $project: {
          _id: '$_id',
          hall_name: '$venueDetails.hall_name',
          bookingCount: '$bookingCount'
        }
      }
    ]);
    res.status(200).json(bookedVenues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
