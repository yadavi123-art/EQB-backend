const mongoose = require('mongoose');
const Wishlist = mongoose.model('Wishlist');
const HomepageContent = mongoose.model('HomepageContent');
const Offer = mongoose.model('Offer');
const Rating= mongoose.model('Rating');

const Venue = mongoose.model('Venue');

async function getPopularVenues() {
  try {
    const filter = { $gt: 0 };
    const reviewVenues = await Rating.find({ average_rating: filter }).lean();
    const venuFilter = {
      _id: {
        $in: reviewVenues.map((ele) => (ele._id))
      }
    }
    const venues = await Venue.find({ 
      // venuFilter
     });

    // Combine the results from all schemas
  let popularVenues = [...venues];

    if (popularVenues.length === 0) {
      popularVenues = [];
    }

    return popularVenues;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch popular venues');
  }
}

module.exports = { getPopularVenues };
