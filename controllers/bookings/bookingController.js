const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');
const Venue = mongoose.model('Venue');

// Create a new booking
exports.createBooking = async (req, res) => {
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
};

// Get bookings by user ID
exports.getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ user_id: req.params.user_id });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get bookings by hall ID
exports.getBookingsByHall = async (req, res) => {
  try {
    const bookings = await Booking.find({ hall_id: req.params.hall_id });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get a single booking by booking ID
exports.getBookingById = async (req, res) => {
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
};

// Check venue availability
exports.checkAvailability = async (req, res) => {
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
      return res.status(200).json({ available: false, message: 'Venue is booked on this date.' });
    } else {
      return res.status(200).json({ available: true, message: 'Venue is available on this date.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get total number of bookings
exports.getTotalBookings = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    res.status(200).json({ totalBookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get a list of all booked venues with their booking counts
exports.getBookedVenues = async (req, res) => {
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
};
