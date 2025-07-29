const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  admin_id: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  phone_no: { type: String, required: true },
  Password: { type: String, required: true }
});

adminSchema.pre('save', async function(next) {
  if (!this.isModified('Password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model('Admin', adminSchema);
