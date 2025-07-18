const express = require('express');
const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');
const Venue = mongoose.model('Venue');

const router = express.Router();

// POST a new booking
router.post('/', async (req, res) => {
  try {
    const {
      user_id,
      hall_id,
      booking_dates,
      status,
      purpose,
      guest_quantity,
      addons,
      special_requests,
      contact_name,
      contact_email,
      contact_phone
    } = req.body;

    // Check if the venue is available for the requested dates
    for (let i = 0; i < booking_dates.length; i++) {
      const checkDate = new Date(booking_dates[i]);
      const existingBookings = await Booking.find({
        hall_id: hall_id,
        booking_dates: {
          $elemMatch: {
            $gte: new Date(checkDate.setHours(0, 0, 0, 0)),
            $lt: new Date(checkDate.setHours(23, 59, 59, 999))
          }
        }
      });

      if (existingBookings.length > 0) {
        return res.status(400).json({ msg: `Venue is already booked on ${booking_dates[i]}.` });
      }
    }

    const newBooking = new Booking({
      booking_id: new mongoose.Types.ObjectId().toString(), // Generate a unique booking_id
      user_id,
      hall_id,
      booking_dates,
      status,
      purpose,
      guest_quantity,
      addons,
      special_requests,
      contact_name,
      contact_email,
      contact_phone
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET bookings by user ID
router.get('/user/:user_id', async (req, res) => {
  try {
    const bookings = await Booking.find({ user_id: req.params.user_id });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET bookings by hall ID
router.get('/hall/:hall_id', async (req, res) => {
  try {
    const bookings = await Booking.find({ hall_id: req.params.hall_id });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET a single booking by booking ID
router.get('/:booking_id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ booking_id: req.params.booking_id });
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found.' });
    }
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
