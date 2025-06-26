const mongoose = require('mongoose');
const Wishlist = mongoose.model('Wishlist');
const HomepageContent = mongoose.model('HomepageContent');
const OfferSection = mongoose.model('OfferSection');
const Rating= mongoose.model('Rating');

const Venue = mongoose.model('Venue');

async function getPopularVenues() {
  try {
    const wishlistVenues = await Wishlist.find({ ratings: { $gt: 4 } });
    const homepageVenues = await HomepageContent.find({ ratings: { $gt: 4 } });
    const offerSectionVenues = await OfferSection.find({ ratings: { $gt: 4 } });
    const reviewVenues = await Review.find({ average_rating: { $gt: 4 } });

    // Combine the results from all schemas
    let popularVenues = [...wishlistVenues, ...homepageVenues, ...offerSectionVenues, ...reviewVenues];

    if (popularVenues.length === 0) {
      popularVenues = [{
        venueName: 'Sample Venue',
        ratings: 4.5,
        location: 'Sample Location'
      }];
    }

    return popularVenues;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch popular venues');
  }
}

module.exports = { getPopularVenues };
