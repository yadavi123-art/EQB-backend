const mongoose = require('mongoose');

const InclusionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  category: String
});

module.exports = mongoose.model('Inclusion', InclusionSchema);
