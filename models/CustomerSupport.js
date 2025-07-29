const mongoose = require('mongoose');

const customerSupportSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Msg: { type: String, required: true }
});

module.exports = mongoose.model('CustomerSupport', customerSupportSchema);
