const mongoose = require('mongoose');

const destinationWeddingPageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  banner_image_url: { type: String },
  sections: [{
    heading: { type: String },
    content: { type: String },
    image_url: { type: String }
  }],
  featured_venues: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue'
  }],
  testimonials: [{
    quote: { type: String },
    author: { type: String }
  }],
  last_updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DestinationWeddingPage', destinationWeddingPageSchema);
