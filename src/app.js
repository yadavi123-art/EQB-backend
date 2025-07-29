const mongoose = require('mongoose');

const db = require('./db.js'); // Import the database connection

// Import all models from schema.js
const { 
  User,
  Admin,
  Booking,
  Offer,
  HallAmenity,
  Payment,
  Wishlist,
  CustomerSupport,
  Rating,
  History
} = require('./schema.js');

// You can now use these models to interact with the database
