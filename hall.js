const express = require('express');
const mongoose = require('mongoose');
const Venue = mongoose.model('Venue'); // Assuming Venue model represents Halls

const router = express.Router();

// GET all halls
router.get('/', async (req, res) => {
  try {
    const halls = await Venue.find();
    res.json(halls);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET a specific hall by ID


router.get('/:id', async (req, res) => {
  try {
    const hall = await Venue.findById(req.params.id);
    if (!hall) {
      return res.status(404).json({ msg: 'Hall not found' });
    }
    res.json(hall);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST a new hall
router.post('/', async (req, res) => {
  try {
    const newHall = new Venue({
      hall_name: req.body.hall_name,
      hall_type: req.body.hall_type,
      location: req.body.location,
      priceperday: req.body.priceperday,
      availabilty_status: req.body.availabilty_status,
      hall_amenities: req.body.hall_amenities,
      images: req.body.images,
      averageRating: req.body.averageRating,
      individualRatings: req.body.individualRatings
    });
    const hall = await newHall.save();
    res.json(hall);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT (update) an existing hall
router.put('/:id', async (req, res) => {
  try {
    const hall = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hall) {
      return res.status(404).json({ msg: 'Hall not found' });
    }
    
    hall.averageRating = req.body.averageRating || hall.averageRating;
    hall.individualRatings = req.body.individualRatings || hall.individualRatings;

    const updatedHall = await hall.save();
    res.json(updatedHall);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE a hall
router.delete('/:id', async (req, res) => {
  try {
    const hall = await Venue.findByIdAndDelete(req.params.id);
    if (!hall) {
      return res.status(404).json({ msg: 'Hall not found' });
    }
    res.json({ msg: 'Hall deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
