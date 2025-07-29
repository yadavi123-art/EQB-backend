const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  hall_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true
  },
  user_phone: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ek user (phone number) ek hall ko ek hi baar rate kare
ratingSchema.index({ hall_id: 1, user_phone: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
