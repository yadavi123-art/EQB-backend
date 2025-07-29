const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  phone_no: { type: String, required: true },
  password: { type: String, required: true },
  review_count: { type: Number, default: 0 },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
