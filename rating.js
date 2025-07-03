const express = require('express');
const mongoose = require('mongoose');
const Rating = mongoose.model('Rating');
const Venue = mongoose.model('Venue');

const router = express.Router();

// POST a new rating for a hall
router.post('/', async (req, res) => {
  try {
    const { hall_id, user_phone, rating, review } = req.body;

    // Check if the user has already rated this hall
    const existingRating = await Rating.findOne({ hall_id, user_phone });
    if (existingRating) {
      return res.status(400).json({ msg: 'You have already rated this hall.' });
    }

    const newRating = new Rating({
      hall_id,
      user_phone,
      rating,
      review
    });

    const savedRating = await newRating.save();

    // Update Venue's averageRating and individualRatings
    const venue = await Venue.findById(hall_id);
    if (venue) {
      // Update individualRatings
      venue.individualRatings[rating] = (venue.individualRatings[rating] || 0) + 1;

      // Recalculate averageRating
      let totalRating = 0;
      let totalVotes = 0;
      for (const key in venue.individualRatings) {
        totalRating += parseInt(key) * venue.individualRatings[key];
        totalVotes += venue.individualRatings[key];
      }
      venue.averageRating = totalVotes > 0 ? (totalRating / totalVotes) : 0;

      await venue.save();
    }

    res.status(201).json(savedRating);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET all ratings for a specific hall
router.get('/:hall_id', async (req, res) => {
  try {
    const ratings = await Rating.find({ hall_id: req.params.hall_id });
    res.json(ratings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
