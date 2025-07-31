const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const wishlistController = require('../controllers/wishlistController');

// Add venue to wishlist
router.post('/', authMiddleware, wishlistController.addToWishlist);

// Get user's wishlist
router.get('/', authMiddleware, wishlistController.getUserWishlist);

// Remove venue from wishlist
router.delete('/:venue_id', authMiddleware, wishlistController.removeFromWishlist);

module.exports = router;
