const mongoose = require('mongoose');
const { Offer, Venue } = require('../../schema.js');

// Get all offers with venue details
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate('hall_id');
    const offerData = offers.map(offer => ({
      _id: offer._id,
      image: offer.hall_id.images || "Image",
      venueName: offer.hall_id.hall_name,
      venue_id: offer.hall_id._id,
      location: offer.hall_id.location,
      discount_percent: offer.discount_percent
    }));
    res.json(offerData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Create a new offer
exports.createOffer = async (req, res) => {
  try {
    const { hall_id, startDate, endDate, discount_percent, description } = req.body;
    if (!hall_id || !mongoose.Types.ObjectId.isValid(hall_id)) {
      return res.status(400).json({ error: 'Invalid or missing hall_id (ObjectId expected)' });
    }
    const venueExists = await Venue.findById(hall_id);
    if (!venueExists) {
      return res.status(404).json({ error: 'Venue with given hall_id not found' });
    }

    const newOffer = new Offer({ hall_id, startDate, endDate, discount_percent, description });
    await newOffer.save();
    res.status(201).json({ message: 'Offer created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get offers by venue ID
exports.getOffersByVenue = async (req, res) => {
  try {
    const { venueId } = req.params;
    const offers = await Offer.find({ hall_id: venueId }).populate('hall_id');

    if (!offers || offers.length === 0) {
      return res.status(404).json({ message: 'No offers found for this venue' });
    }

    const offerData = offers.map(offer => {
      const venue = offer.hall_id;
      if (!venue) {
        return {
          _id: offer._id,
          image: "No Image Available",
          venueName: "Venue Not Found",
          location: "N/A",
          discount_percent: offer.discount_percent,
          startDate: offer.startDate,
          endDate: offer.endDate,
          description: offer.description
        };
      }
      return {
        _id: offer._id,
        image: venue.images && venue.images.length > 0 ? venue.images[0].url : "No Image Available",
        venueName: venue.hall_name,
        location: venue.location,
        discount_percent: offer.discount_percent,
        startDate: offer.startDate,
        endDate: offer.endDate,
        description: offer.description
      };
    });
    res.json(offerData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Update an offer by ID
exports.updateOffer = async (req, res) => {
  try {
    const offerId = req.params.id;
    const { hall_id, startDate, endDate, discount_percent, description } = req.body;

    // Check if offer exists
    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    // Optional: validate ObjectId before assigning
    if (hall_id) offer.hall_id = hall_id;
    if (startDate) offer.startDate = new Date(startDate);
    if (endDate) offer.endDate = new Date(endDate);
    if (discount_percent) offer.discount_percent = discount_percent;
    if (description) offer.description = description;

    // Save updated offer
    await offer.save();

    res.status(200).json({
      message: 'Offer updated successfully',
      offer
    });
  } catch (err) {
    console.error('Update Offer Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete an offer by ID
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    await offer.remove();

    res.json({ message: 'Offer deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get popular offers
exports.getPopularOffers = async (req, res) => {
  try {
    const offers = await Offer.find()
      .populate({
        path: 'hall_id',
        select: 'images hall_name location averageRating'
      })
      .sort({ 'hall_id.averageRating': -1 })
      .limit(6);

    const offerData = offers.map(offer => {
      const venue = offer.hall_id;
      if (!venue) {
        return {
          _id: offer._id,
          image: "No Image Available",
          venueName: "Venue Not Found",
          venue_id: null,
          location: "N/A",
          discount_percent: offer.discount_percent,
          averageRating: 0,
          description: offer.description
        };
      }
      return {
        _id: offer._id,
        image: venue.images && venue.images.length > 0 ? venue.images[0].url : "No Image Available",
        venueName: venue.hall_name,
        venue_id: venue._id,
        location: venue.location,
        discount_percent: offer.discount_percent,
        averageRating: venue.averageRating,
        description: offer.description
      };
    });
    
    res.json(offerData);
  } catch (error) {
    console.error('Error fetching popular offers:', error);
    res.status(500).send('Server error');
  }
};
