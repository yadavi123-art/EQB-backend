const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');
const Booking = mongoose.model('Booking');

async function searchVenuesByDateOrPrice(date, price, location) {
  try {
    if (!date && !price) {
      throw new Error('At least one of date or price must be provided.');
    }

    let bookedHalls = [];
    if (date) {
      const checkDate = new Date(date);
      if (isNaN(checkDate.getTime())) {
        throw new Error('Invalid date. Please provide a valid date in YYYY-MM-DD format.');
      }

      const startOfDay = new Date(checkDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(checkDate.setHours(23, 59, 59, 999));

      bookedHalls = await Booking.find({
        booking_dates: {
          $elemMatch: {
            $gte: startOfDay,
            $lt: endOfDay
          }
        }
      }).distinct('hall_id');
    }

    const query = {};

    if (date) {
      query._id = { $nin: bookedHalls };
    }

    if (price) {
      query.priceperday = { $lte: price };
    }

    if (location) {
      query.location = { $regex: new RegExp(location, 'i') };
    }

    const availableVenues = await Venue.find(query);

    return availableVenues;
  } catch (error) {
    console.error('Error searching venues by date or price:', error);
    throw new Error('Failed to search venues by date or price');
  }
}

module.exports = { searchVenuesByDateOrPrice };
