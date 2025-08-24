const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Note: All venue-specific rating endpoints have been moved to /venues routes
// This file is kept for any future non-venue-specific rating functionality

module.exports = router;
