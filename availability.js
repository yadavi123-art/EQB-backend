const express = require('express');
const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');

const router = express.Router();

// GET endpoint to check venue availability
router.get('/:hall_id/:date', async (req, res) => {
  try {
    const { hall_id, date } = req.params;
    const checkDate = new Date(date);
    
    // Find bookings for the given hall and date
    const bookings = await Booking.find({
      hall_id: hall_id,
      booking_dates: {
          $gte: new Date(checkDate.setHours(0, 0, 0, 0)),
          $lt: new Date(checkDate.setHours(23, 59, 59, 999))
        
      }
    });

    if (bookings.length > 0) {
        console.log("if block");
      return res.status(200).json({ available: false, message: 'Venue is booked on this date.' });
    } else {
      console.log("else block"); 
      return res.status(200).json({ available: true, message: 'Venue is available on this date.' });
       
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
