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

const venueOwnerSchema = new mongoose.Schema({
  Owner_id: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Phone_no: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('VenueOwner', venueOwnerSchema);

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
  }]
});

module.exports = mongoose.model('Venue', venueSchema);

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

const offerSchema = new mongoose.Schema({
  hall_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  discount_percent: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
});


module.exports = mongoose.model('Offer', offerSchema);



const paymentSchema = new mongoose.Schema({
  payment_id: { type: String, required: true, unique: true },
  booking_id: { type: String, required: true },
  user_id: { type: String, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);


const customerSupportSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Msg: { type: String, required: true }
});

module.exports = mongoose.model('CustomerSupport', customerSupportSchema);

const wishlistSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  venue_id: { type: String, required: true },
  image: { type: String, required: true },
  venueName: { type: String, required: true },
  ratings: { type: Number, required: true },
  location: { type: String, required: true }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);

const ratingSchema = new mongoose.Schema({
  hall_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true
  },
  user_phone: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String }
  ,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ek user (phone number) ek hall ko ek hi baar rate kare
ratingSchema.index({ hall_id: 1, user_phone: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);

const historySchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  venue_id: { type: String, required: true },
  booking_date: { type: Date, required: true },
  booking_time: { type: String, required: true },
  status: { type: String, required: true },
  total_amount: { type: Number, required: true },
  payment_status: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);

const HomepageContentSchema = new mongoose.Schema({
  image: String,
  venueName: String,
  ratings: Number,
  location: String
});

module.exports = mongoose.model('HomepageContent', HomepageContentSchema);
