const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  hall_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  discount_percent: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Offer', offerSchema);
