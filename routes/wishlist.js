const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const authMiddleware = require('../middleware/auth');

// Get user's wishlist
router.get('/', authMiddleware, wishlistController.getUserWishlist);

// Note: Venue-specific wishlist endpoints (add/remove) moved to /venues routes

module.exports = router;
