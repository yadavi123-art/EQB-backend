const express = require('express');
const router = express.Router();
const Offer = require('./schema.js').model('Offer');
const Venue = require('./schema.js').model('Venue');

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
router.get('/offers', async (req, res) => {
  try {
    const offers = await Offer.find().populate('hall_id');
    const offerData = offers.map(offer => ({
      image: offer.hall_id.image,
      venueName: offer.hall_id.hall_type,
      location: 'Sample Location', // Replace with actual location data if available
      discount_percent: offer.discount_percent
    }));
    res.json(offerData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { hall_id, startDate, endDate, discount_percent } = req.body;
    const newOffer = new Offer({ hall_id, startDate, endDate, discount_percent });
    await newOffer.save();
    res.status(201).json({ message: 'Offer created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
