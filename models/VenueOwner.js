const mongoose = require('mongoose');

const venueOwnerSchema = new mongoose.Schema({
  Owner_id: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Phone_no: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('VenueOwner', venueOwnerSchema);
