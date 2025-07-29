const mongoose = require('mongoose');

const HomepageContentSchema = new mongoose.Schema({
  image: String,
  venueName: String,
  ratings: Number,
  location: String
});

module.exports = mongoose.model('HomepageContent', HomepageContentSchema);
