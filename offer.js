const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Offer = require('./schema.js').model('Offer');
const Venue = require('./schema.js').model('Venue');

/**
 * @swagger
 * /offers/{id}:
 *   put:
 *     summary: Update an existing offer
 *     tags: [Offer]
 *     description: Updates an existing offer.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the offer to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hall_id:
 *                 type: string
 *                 description: The ID of the venue.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the offer.
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the offer.
 *               discount_percent:
 *                 type: number
 *                 description: The discount percentage of the offer.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       404:
 *         description: Offer not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete an existing offer
 *     tags: [Offer]
 *     description: Deletes an existing offer.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the offer to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       404:
 *         description: Offer not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /offers:
 *   get:
 *     summary: Get all offers with venue details
 *     tags: [Offer]
 *     description: Returns a list of all offers with venue details (image, name, location, discount).
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   image:
 *                     type: string
 *                     description: The URL of the venue image.
 *                   venueName:
 *                     type: string
 *                     description: The name of the venue.
 *                   location:
 *                     type: string
 *                     description: The location of the venue.
 *                   discount_percent:
 *                     type: number
 *                     description: The discount percentage of the offer.
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create new offer
 *     tags: [Offer]
 *     description: Creates a new offer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hall_id:
 *                 type: string
 *                 description: The ID of the venue.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the offer.
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the offer.
 *               discount_percent:
 *                 type: number
 *                 description: The discount percentage of the offer.
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find()
      .populate({
        path: 'hall_id',
        select: 'images hall_name location averageRating' // Select necessary fields including averageRating
      })
      .sort({ 'hall_id.averageRating': -1 }); // Sort by averageRating in descending order

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
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
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
});

/**
 * @swagger
 * /offers/venue/{venueId}:
 *   get:
 *     summary: Get all offers for a specific venue
 *     tags: [Offer]
 *     description: Returns a list of all offers created on a particular venue, including venue details.
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         description: ID of the venue to retrieve offers for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the offer.
 *                   image:
 *                     type: string
 *                     description: The URL of the venue image.
 *                   venueName:
 *                     type: string
 *                     description: The name of the venue.
 *                   location:
 *                     type: string
 *                     description: The location of the venue.
 *                   discount_percent:
 *                     type: number
 *                     description: The discount percentage of the offer.
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     description: The start date of the offer.
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     description: The end date of the offer.
 *       404:
 *         description: No offers found for this venue
 *       500:
 *         description: Server error
 */
router.get('/venue/:venueId', async (req, res) => {
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
});

// Update an offer by ID
router.put('/:id', async (req, res) => {
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
});

router.delete('/:id', async (req, res) => {
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
});

module.exports = router;
