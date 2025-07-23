const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');

// PUT/PATCH /venues/:venue_id/addons - Update add-ons for a venue
router.put('/:venue_id/addons', async (req, res) => {
  try {
    const { venue_id } = req.params;
    const { addons } = req.body;

    const venue = await Venue.findById(venue_id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    // Replace the entire addons array with the new one
    venue.addons = addons;

    await venue.save();
    res.status(200).json(venue);
  } catch (error) {
    console.error('Error updating venue add-ons:', error);
    res.status(500).json({ message: 'Failed to update venue add-ons', error: error.message });
  }
});

module.exports = router;
