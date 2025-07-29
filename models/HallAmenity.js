const mongoose = require('mongoose');

const hallAmenitySchema = new mongoose.Schema({
  ameniti_id: { type: String, required: true, unique: true },
  amenity_type: { type: String, required: true },
  amenity_description: { type: String, required: true },
  amenity_qnt: { type: Number, required: true },
  hall_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Venue',
    required: true
  }
});

module.exports = mongoose.model('HallAmenity', hallAmenitySchema);
