const mongoose = require('mongoose');
const Wishlist = mongoose.model('Wishlist');
const HomepageContent = mongoose.model('HomepageContent');
const Offer = mongoose.model('Offer');
const Rating= mongoose.model('Rating');

const Venue = mongoose.model('Venue');

async function getPopularVenues() {
  try {
    const popularVenues = await Venue.find()
      .sort({ averageRating: -1 }) // Sort by averageRating in descending order
      .limit(6); // Limit to 6 venues

    return popularVenues;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch popular venues');
  }
}

module.exports = { getPopularVenues };
