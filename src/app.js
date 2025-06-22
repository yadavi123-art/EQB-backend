const mongoose = require('mongoose');

const db = require('./db.js'); // Import the database connection

const User = require('./schema.js'); // Require the user schema
// You can now use the User model to interact with the database
const Admin = require('./schema.js').model('Admin'); // Require the admin schema
// You can now use the Admin model to interact with the database
const Booking = require('./schema.js').model('Booking'); // Require the booking schema
// You can now use the Booking model to interact with the database
const Offer = require('./schema.js').model('Offer'); // Require the offer schema
// You can now use the Offer model to interact with the database
const HallAmenity = require('./schema.js').model('HallAmenity'); // Require the hallAmenity schema
// You can now use the HallAmenity model to interact with the database
const Payment = require('./schema.js').model('Payment'); // Require the payment schema
// You can now use the Payment model to interact with the database
const Wishlist = require('./schema.js').model('Wishlist'); // Require the wishlist schema
// You can now use the Wishlist model to interact with the database
const CustomerSupport = require('./schema.js').model('CustomerSupport'); // Require the customerSupport schema
// You can now use the CustomerSupport model to interact with the database
const Review = require('./schema.js').model('Review'); // Require the review schema
// You can now use the Review model to interact with the database
const History = require('./schema.js').model('History'); // Require the history schema
// You can now use the History model to interact with the database
