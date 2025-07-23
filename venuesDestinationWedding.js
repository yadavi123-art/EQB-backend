const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');

// GET /venues/destinationWeddingOnly - Get venues that offer only destination wedding plans
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find({ offers_destination_wedding: true })
      .populate({
        path: 'destination_wedding_packages.inclusions',
        model: 'Inclusion'
      }); // Populate inclusions within packages

    if (venues.length === 0) {
      return res.status(404).json({ message: 'No venues offering destination wedding plans found.' });
    }

    res.status(200).json(venues);
  } catch (error) {
    console.error('Error fetching venues offering destination wedding plans:', error);
    res.status(500).json({ message: 'Failed to fetch venues offering destination wedding plans', error: error.message });
  }
});

module.exports = router;
