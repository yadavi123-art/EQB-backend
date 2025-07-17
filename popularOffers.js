const mongoose = require('mongoose');
const Offer = mongoose.model('Offer');
const Venue = mongoose.model('Venue');

async function getPopularOffers() {
  try {
    const offers = await Offer.find()
      .populate({
        path: 'hall_id',
        select: 'images hall_name location averageRating'
      })
      .sort({ 'hall_id.averageRating': -1 })
      .limit(6);

    const offerData = offers.map(offer => {
      const venue = offer.hall_id;
      if (!venue) {
        return {
          _id: offer._id,
          image: "No Image Available",
          venueName: "Venue Not Found",
          venue_id: null,
          location: "N/A",
          discount_percent: offer.discount_percent,
          averageRating: 0,
          description: offer.description
        };
      }
      return {
        _id: offer._id,
        image: venue.images && venue.images.length > 0 ? venue.images[0].url : "No Image Available",
        venueName: venue.hall_name,
        venue_id: venue._id,
        location: venue.location,
        discount_percent: offer.discount_percent,
        averageRating: venue.averageRating,
        description: offer.description
      };
    });
    return offerData;
  } catch (error) {
    console.error('Error fetching popular offers:', error);
    throw new Error('Failed to fetch popular offers');
  }
}

module.exports = { getPopularOffers };
