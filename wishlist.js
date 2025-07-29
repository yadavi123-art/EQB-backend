const express = require('express');
const router = express.Router();
const { Wishlist } = require('./schema.js');
const authMiddleware = require('./middleware/auth.js'); // Assuming you have an auth middleware

/**
 * @swagger
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: The ID of the user.
 *         venue_id:
 *           type: string
 *           description: The ID of the venue.
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
 * /wishlist:
 *   post:
 *     summary: Add venue to wishlist
 *     tags: [Wishlist]
 *     description: Adds a venue to the user's wishlist.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venue_id:
 *                 type: string
 *                 description: The ID of the venue.
 *               image:
 *                 type: string
 *                 description: The URL of the image.
 *               venueName:
 *                 type: string
 *                 description: The name of the venue.
 *               ratings:
 *                 type: number
 *                 description: The rating of the venue.
 *               location:
 *                 type: string
 *                 description: The location of the venue.
 *     responses:
 *       201:
 *         description: Venue added to wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       401:
 *         description: Unauthorized - User not logged in
 *       409:
 *         description: Conflict - Venue already in wishlist
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log("req.user", req.user);
    const { venue_id, image, venueName, ratings, location } = req.body;
    const user_id = req.user.userId; // Assuming authMiddleware adds user info to req

    // Check if the venue already exists in the user's wishlist
    const existingWishlistItem = await Wishlist.findOne({ user_id, venue_id });

    if (existingWishlistItem) {
      return res.status(409).json({ message: 'Venue already in wishlist' });
    }

    const newWishlistItem = new Wishlist({
      user_id,
      venue_id,
      image,
      venueName,
      ratings,
      location,
    });

    await newWishlistItem.save();
    res.status(201).json(newWishlistItem);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
