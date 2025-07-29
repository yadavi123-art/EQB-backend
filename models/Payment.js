const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  payment_id: { type: String, required: true, unique: true },
  booking_id: { type: String, required: true },
  user_id: { type: String, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);
