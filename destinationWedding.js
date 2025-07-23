const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');
const Inclusion = mongoose.model('Inclusion'); // Make sure Inclusion model is loaded

// PUT/PATCH /venues/:venue_id/destinationWedding - Update destination wedding details for a venue
router.put('/:venue_id/destinationWedding', async (req, res) => {
  try {
    const { venue_id } = req.params;
    const { offers_destination_wedding, destination_wedding_packages } = req.body;

    const venue = await Venue.findById(venue_id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    venue.offers_destination_wedding = offers_destination_wedding;
    venue.destination_wedding_packages = destination_wedding_packages;

    await venue.save();
    res.status(200).json(venue);
  } catch (error) {
    console.error('Error updating destination wedding details:', error);
    res.status(500).json({ message: 'Failed to update destination wedding details', error: error.message });
  }
});

module.exports = router;
