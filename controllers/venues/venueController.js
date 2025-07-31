const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');
const Offer = mongoose.model('Offer');
const Rating = mongoose.model('Rating');
const Booking = mongoose.model('Booking');

// Get all halls/venues
exports.getAllVenues = async (req, res) => {
  try {
    const halls = await Venue.find();
    res.json(halls);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get a specific hall/venue by ID
exports.getVenueById = async (req, res) => {
  try {
    const hall = await Venue.findById(req.params.id);
    if (!hall) {
      return res.status(404).json({ msg: 'Hall not found' });
    }

    // Find offers related to this hall
    const offers = await Offer.find({ hall_id: req.params.id });
    const ratings = await Rating.find({ hall_id: req.params.id }).sort({ createdAt: -1 }); // Fetch all ratings, sort by latest

    // Combine hall data with offers and the latest review
    const hallWithOffers = {
      ...hall.toObject(),
      offers: offers.map(offer => offer.toObject()),
      review: ratings.length > 0 ? ratings[0].review : null, // Add the review from the latest rating
      individualRatings: hall.individualRatings ? Object.fromEntries(hall.individualRatings) : {} // Include individualRatings
    };

    res.json(hallWithOffers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Create a new hall/venue
exports.createVenue = async (req, res) => {
  try {
    const newHall = new Venue({
      hall_name: req.body.hall_name,
      hall_type: req.body.hall_type,
      location: req.body.location,
      priceperday: req.body.priceperday,
      availabilty_status: req.body.availabilty_status,
      hall_amenities: req.body.hall_amenities,
      images: req.body.images,
      averageRating: req.body.averageRating
    });
    const hall = await newHall.save();
    res.json(hall);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Update an existing hall/venue
exports.updateVenue = async (req, res) => {
  try {
    const hall = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hall) {
      return res.status(404).json({ msg: 'Hall not found' });
    }
    
    hall.averageRating = req.body.averageRating || hall.averageRating;

    const updatedHall = await hall.save();
    res.json(updatedHall);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Delete a hall/venue
exports.deleteVenue = async (req, res) => {
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
};

// Search venues by name or location
exports.searchVenues = async (req, res) => {
  try {
    const { query, location } = req.query;
    const searchCriteria = {};

    if (query) {
      // Case-insensitive search for venue name
      searchCriteria.hall_name = { $regex: query, $options: 'i' };
    }

    if (location) {
      // Case-insensitive search for location
      searchCriteria.location = { $regex: location, $options: 'i' };
    }

    // Select only the required fields: images, hall_name, location, averageRating
    const venues = await Venue.find(searchCriteria).select('images hall_name location averageRating');
    res.json(venues);
  } catch (error) {
    console.error('Error searching venues:', error);
    res.status(500).send('Server error');
  }
};

// Search venues by date or price
exports.searchVenuesByDateOrPrice = async (req, res) => {
  try {
    const { date, price, location } = req.query;

    if (!date && !price) {
      return res.status(400).json({ error: 'At least one of date or price must be provided.' });
    }

    let bookedHalls = [];
    if (date) {
      const checkDate = new Date(date);
      if (isNaN(checkDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date. Please provide a valid date in YYYY-MM-DD format.' });
      }

      const startOfDay = new Date(checkDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(checkDate.setHours(23, 59, 59, 999));

      bookedHalls = await Booking.find({
        booking_dates: {
          $elemMatch: {
            $gte: startOfDay,
            $lt: endOfDay
          }
        }
      }).distinct('hall_id');
    }

    const query = {};

    if (date) {
      query._id = { $nin: bookedHalls };
    }

    if (price) {
      query.priceperday = { $lte: price };
    }

    if (location) {
      query.location = { $regex: new RegExp(location, 'i') };
    }

    const availableVenues = await Venue.find(query);
    res.json(availableVenues);
  } catch (error) {
    console.error('Error searching venues by date or price:', error);
    res.status(500).send('Server error');
  }
};

// Get venues sorted by price
exports.getVenuesSortedByPrice = async (req, res) => {
  try {
    const venues = await Venue.find().sort({ priceperday: 1 });
    res.json(venues);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Get popular venues
exports.getPopularVenues = async (req, res) => {
  try {
    const popularVenues = await Venue.find()
      .sort({ averageRating: -1 }) // Sort by averageRating in descending order
      .limit(6); // Limit to 6 venues

    res.json(popularVenues);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Update add-ons for a venue
exports.updateVenueAddons = async (req, res) => {
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
};
