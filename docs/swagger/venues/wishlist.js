/**
 * @swagger
 * /venues/{venue_id}/wishlist:
 *   post:
 *     summary: Add venue to user's wishlist
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venue_id
 *         required: true
 *         description: ID of the venue to add to wishlist
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - venueName
 *               - ratings
 *               - location
 *             properties:
 *               image:
 *                 type: string
 *                 description: URL of the venue image
 *               venueName:
 *                 type: string
 *                 description: Name of the venue
 *               ratings:
 *                 type: number
 *                 description: Average rating of the venue
 *               location:
 *                 type: string
 *                 description: Location of the venue
 *     responses:
 *       201:
 *         description: Venue added to wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: ID of the user
 *                 venue_id:
 *                   type: string
 *                   description: ID of the venue
 *                 image:
 *                   type: string
 *                   description: URL of the venue image
 *                 venueName:
 *                   type: string
 *                   description: Name of the venue
 *                 ratings:
 *                   type: number
 *                   description: Average rating of the venue
 *                 location:
 *                   type: string
 *                   description: Location of the venue
 *       401:
 *         description: Unauthorized - Authentication required
 *       409:
 *         description: Venue already in wishlist
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Remove venue from user's wishlist
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venue_id
 *         required: true
 *         description: ID of the venue to remove from wishlist
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venue removed from wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: Wishlist item not found
 *       500:
 *         description: Server error
 */
