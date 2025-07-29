const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  venue_id: { type: String, required: true },
  booking_date: { type: Date, required: true },
  booking_time: { type: String, required: true },
  status: { type: String, required: true },
  total_amount: { type: Number, required: true },
  payment_status: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);
