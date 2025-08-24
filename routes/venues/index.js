const express = require('express');
const router = express.Router();
const venueController = require('../../controllers/venues/venueController');
const bookingController = require('../../controllers/bookings/bookingController');
const ratingController = require('../../controllers/ratingController');
const offerController = require('../../controllers/offers/offerController');
const wishlistController = require('../../controllers/wishlistController');
const auth = require('../../middleware/auth');

// Hall/venue routes - base routes
router.get('/', venueController.getAllVenues);
router.post('/', venueController.createVenue);

// Search and filter routes
router.get('/search', venueController.searchVenues);
router.get('/searchByDate', venueController.searchVenuesByDateOrPrice);
router.get('/sortByPrice', venueController.getVenuesSortedByPrice);
router.get('/popular', venueController.getPopularVenues);

// Venue availability routes
router.get('/:hall_id/availability/:date', bookingController.checkAvailability);

// Venue bookings routes
router.get('/:hall_id/bookings', bookingController.getBookingsByHall);

// Venue ratings routes
router.post('/:hall_id/ratings', ratingController.createRating);
router.get('/:hall_id/ratings', ratingController.getRatingsByHall);
router.put('/:hall_id/ratings/:user_phone', ratingController.updateRating);

// Venue offers routes
router.get('/:venueId/offers', offerController.getOffersByVenue);

// Venue wishlist routes
router.post('/:venue_id/wishlist', auth, wishlistController.addToWishlist);
router.delete('/:venue_id/wishlist', auth, wishlistController.removeFromWishlist);

// Venue reports routes (requires authentication)
router.get('/reports/booked-venues', auth, bookingController.getBookedVenues);

// Specific ID routes - must come after other GET routes to avoid conflicts
router.get('/:id', venueController.getVenueById);
router.put('/:id', venueController.updateVenue);
router.delete('/:id', venueController.deleteVenue);

// Venue add-ons
router.put('/:venue_id/addons', venueController.updateVenueAddons);

module.exports = router;
