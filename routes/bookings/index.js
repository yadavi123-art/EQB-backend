const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const bookingController = require('../../controllers/bookings/bookingController');

// Create a new booking
router.post('/', bookingController.createBooking);

// Get bookings by user ID
router.get('/user/:user_id', bookingController.getBookingsByUser);

// Get bookings by hall ID
router.get('/hall/:hall_id', bookingController.getBookingsByHall);

// Check venue availability
router.get('/availability/:hall_id/:date', bookingController.checkAvailability);

// Booking reports routes (requires authentication)
router.get('/reports/bookings/total', auth, bookingController.getTotalBookings);
router.get('/reports/bookings/venues', auth, bookingController.getBookedVenues);

// Get a single booking by booking ID - must come after other GET routes to avoid conflicts
router.get('/:booking_id', bookingController.getBookingById);

module.exports = router;
