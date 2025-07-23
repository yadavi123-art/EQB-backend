const mongoose = require('mongoose');

const inclusionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  category: { type: String } // e.g., "services", "amenities", "decor"
});

module.exports = mongoose.model('Inclusion', inclusionSchema);
