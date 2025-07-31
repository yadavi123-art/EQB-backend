const express = require('express');
const router = express.Router();
const venueController = require('../../controllers/venues/venueController');

// Hall/venue routes - base routes
router.get('/', venueController.getAllVenues);
router.post('/', venueController.createVenue);

// Search and filter routes
router.get('/search', venueController.searchVenues);
router.get('/searchByDate', venueController.searchVenuesByDateOrPrice);
router.get('/sortByPrice', venueController.getVenuesSortedByPrice);
router.get('/popular', venueController.getPopularVenues);

// Specific ID routes - must come after other GET routes to avoid conflicts
router.get('/:id', venueController.getVenueById);
router.put('/:id', venueController.updateVenue);
router.delete('/:id', venueController.deleteVenue);

// Venue add-ons
router.put('/:venue_id/addons', venueController.updateVenueAddons);

module.exports = router;
