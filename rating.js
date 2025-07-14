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
      // Initialize individualRatings if it doesn't exist
      if (!venue.individualRatings) {
        venue.individualRatings = new Map();
      }
      // Update individualRatings
      const roundedRating = Math.round(rating);
      const currentCount = venue.individualRatings.get(roundedRating.toString()) || 0;
      venue.individualRatings.set(roundedRating.toString(), currentCount + 1);

      // Recalculate averageRating
      let totalRating = 0;
      let totalVotes = 0;
      venue.individualRatings.forEach((count, key) => {
        totalRating += parseInt(key) * count;
        totalVotes += count;
      });
      venue.averageRating = totalVotes > 0 ? (totalRating / totalVotes) : 0;

      await venue.save();
    }

    res.status(201).json(savedRating);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT (update) an existing rating for a hall
router.put('/:hall_id/:user_phone', async (req, res) => {
  try {
    const { hall_id, user_phone } = req.params;
    const { rating, review } = req.body;

    const existingRating = await Rating.findOne({ hall_id, user_phone });

    if (!existingRating) {
      return res.status(404).json({ msg: 'Rating not found.' });
    }

    const oldRatingValue = existingRating.rating;

    // Update the rating document
    existingRating.rating = rating;
    existingRating.review = review;
    await existingRating.save();

    // Update Venue's averageRating and individualRatings
    const venue = await Venue.findById(hall_id);
    if (venue) {
      // Initialize individualRatings if it doesn't exist
      if (!venue.individualRatings) {
        venue.individualRatings = new Map();
      }

      // Decrement count for old rating
      const oldRoundedRatingValue = Math.round(oldRatingValue);
      const oldRatingCount = venue.individualRatings.get(oldRoundedRatingValue.toString()) || 0;
      if (oldRatingCount > 0) {
        venue.individualRatings.set(oldRoundedRatingValue.toString(), oldRatingCount - 1);
      }

      // Increment count for new rating
      const newRoundedRating = Math.round(rating);
      const newRatingCount = venue.individualRatings.get(newRoundedRating.toString()) || 0;
      venue.individualRatings.set(newRoundedRating.toString(), newRatingCount + 1);

      // Recalculate averageRating
      let totalRating = 0;
      let totalVotes = 0;
      venue.individualRatings.forEach((count, key) => {
        totalRating += parseInt(key) * count;
        totalVotes += count;
      });
      venue.averageRating = totalVotes > 0 ? (totalRating / totalVotes) : 0;

      await venue.save();
    }

    res.status(200).json(existingRating);
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
