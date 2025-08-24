const express = require('express');
const router = express.Router();

// Import offer controller
const offerController = require('../../controllers/offers/offerController');

// Get all offers
router.get('/', offerController.getAllOffers);

// Create a new offer
router.post('/', offerController.createOffer);

// Note: Venue-specific offer endpoints moved to /venues routes

// Update an offer
router.put('/:id', offerController.updateOffer);

// Delete an offer
router.delete('/:id', offerController.deleteOffer);

// Get popular offers
router.get('/popular', offerController.getPopularOffers);

module.exports = router;
