const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');

async function getVenuesSortedByPrice() {
  try {
    const venues = await Venue.find().sort({ priceperday: -1 });
    return venues;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch venues sorted by price');
  }
}

module.exports = { getVenuesSortedByPrice };
