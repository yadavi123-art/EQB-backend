const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  booking_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  hall_id: { type: String, required: true },
  booking_dates: { type: [Date], required: true },
  status: { type: String, enum: ['booked', 'canceled'], required: true },
  purpose: { type: String, required: true },
  guest_quantity: { type: Number, required: true },
  addons: [{ type: String }],
  special_requests: { type: String },
  contact_name: { type: String, required: true },
  contact_email: { type: String, required: true },
  contact_phone: { type: String, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
