const express = require('express');
const router = express.Router();
const HomepageContent = require('./schema.js').model('HomepageContent');
const offerRouter = require('./offer.js');

// Function to sanitize input data
function sanitizeInput(data) {
  if (typeof data === 'string') {
    return data.replace(/[\"]/g, '\\$&'); // Escape double quotes
  }
  return data;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     HomepageContent:
 *       type: object
 *       properties:
 *         image:
 *           type: string
 *           description: The URL of the image.
 *         venueName:
 *           type: string
 *           description: The name of the venue.
 *         ratings:
 *           type: number
 *           description: The rating of the venue.
 *         location:
 *           type: string
 *           description: The location of the venue.
 */

/**
 * @swagger
 * /homepage:
 *   tags: [Homepage]
 *   get:
 *     summary: Get all homepage content
 *     tags: [Homepage]
 *     description: Returns a list of all homepage content items.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HomepageContent'
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create new homepage content
 *     tags: [Homepage]
 *     description: Creates a new homepage content item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HomepageContent'
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HomepageContent'
 *       500:
 *         description: Server error
 */
router.get('/homepage', async (req, res) => {
  try {
    const homepageContent = await HomepageContent.find();
    res.json(homepageContent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/homepage', (req, res, next) => {
  // Sanitize the input data
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      req.body[key] = sanitizeInput(req.body[key]);
    }
  }
  next();
}, async (req, res) => {
  try {
    const newHomepageContent = new HomepageContent(req.body);
    const savedHomepageContent = await newHomepageContent.save();
    res.status(201).json(savedHomepageContent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /homepage/{id}:
 *   tags: [Homepage]
 *   put:
 *     summary: Update homepage content
 *     tags: [Homepage]
 *     description: Updates an existing homepage content item.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the homepage content item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HomepageContent'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HomepageContent'
 *       404:
 *         description: Homepage content item not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete homepage content
 *     tags: [Homepage]
 *     description: Deletes an existing homepage content item.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the homepage content item to delete
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HomepageContent'
 *     responses:
 *       204:
 *         description: Successful operation
 *       404:
 *         description: Homepage content item not found
 *       500:
 *         description: Server error
 */
router.put('/homepage/:id', async (req, res) => {
  // Sanitize the input data
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      req.body[key] = sanitizeInput(req.body[key]);
    }
  }
  try {
    const homepageContent = await HomepageContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!homepageContent) {
      return res.status(404).send('Homepage content item not found');
    }
    res.json(homepageContent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.use('/offers', offerRouter);

module.exports = router;
