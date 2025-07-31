const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Create a new rating for a hall
router.post('/', ratingController.createRating);

// Update an existing rating for a hall
router.put('/:hall_id/:user_phone', ratingController.updateRating);

// Get all ratings for a specific hall
router.get('/:hall_id', ratingController.getRatingsByHall);

module.exports = router;
