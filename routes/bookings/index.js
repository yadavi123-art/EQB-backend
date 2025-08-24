const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const bookingController = require('../../controllers/bookings/bookingController');

// Bulk availability check - must come before parameterized routes
router.post('/availability/check', bookingController.checkBulkAvailability);

// Create a new booking
router.post('/', bookingController.createBooking);

// Get bookings by user ID
router.get('/user/:user_id', bookingController.getBookingsByUser);

// Booking reports routes (requires authentication)
router.get('/reports/bookings/total', auth, bookingController.getTotalBookings);

// Get a single booking by booking ID - must come after other GET routes to avoid conflicts
router.get('/:booking_id', bookingController.getBookingById);

module.exports = router;
