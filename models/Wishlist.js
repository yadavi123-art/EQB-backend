const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  venue_id: { type: String, required: true },
  image: { type: String, required: true },
  venueName: { type: String, required: true },
  ratings: { type: Number, required: true },
  location: { type: String, required: true }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
