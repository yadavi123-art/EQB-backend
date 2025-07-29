const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  hall_name: { type: String, required: true, unique: true },
  hall_type: { type: String, required: true },
  location: { type: String, required: true },
  priceperday: { type: Number, required: true },
  capacity: { type: Number },
  description: { type: String },
  contactmail: { type: String },
  contact_phone: { type: String },
  availabilty_status: { type: Boolean, required: true },
  hall_amenities: [{ 
    ameniti_id: { type: String, required: true, unique: true },
    amenity_type: { type: String, required: true },
    amenity_description: { type: String, required: true },
    amenity_qnt: { type: Number, required: true }
  }],
  images: [{
    url: { type: String },
    caption: { type: String }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  review: { type: String },
  individualRatings: { type: Map, of: Number },
  offers_destination_wedding: { type: Boolean, default: false },
  destination_wedding_packages: [{
    package_name: { type: String, required: true },
    description: {
      theme: { type: String },
      duration: { type: String },
      location_vibe: { type: String },
      audience: { type: String },
      style: { type: String }
    },
    price: { type: Number },
    inclusions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inclusion' }]
  }],
  addons: [{
    addon_name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    is_available: { type: Boolean, default: true }
  }]
});

module.exports = mongoose.model('Venue', venueSchema);
