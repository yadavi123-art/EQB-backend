/**
 * @swagger
 * tags:
 *   name: Venue Ratings
 *   description: API to manage venue ratings
 */

/**
 * @swagger
 * /venues/{hall_id}/ratings:
 *   post:
 *     summary: Submit a new rating for a venue
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: hall_id
 *         required: true
 *         description: ID of the venue being rated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_phone
 *               - rating
 *             properties:
 *               user_phone:
 *                 type: string
 *                 description: The phone number of the user submitting the rating.
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: The rating given to the venue (1-5).
 *               review:
 *                 type: string
 *                 description: Optional review text.
 *     responses:
 *       201:
 *         description: Rating submitted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       400:
 *         description: Bad request, e.g., user already rated this venue.
 *       500:
 *         description: Server error.
 *   get:
 *     summary: Get all ratings for a specific venue
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: hall_id
 *         required: true
 *         description: ID of the venue to retrieve ratings for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a list of ratings for the specified venue.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rating'
 *       500:
 *         description: Server error.
 *
 * /venues/{hall_id}/ratings/{user_phone}:
 *   put:
 *     summary: Update an existing rating for a venue
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: hall_id
 *         required: true
 *         description: ID of the venue
 *         schema:
 *           type: string
 *       - in: path
 *         name: user_phone
 *         required: true
 *         description: Phone number of the user who submitted the rating
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: The updated rating value (1-5).
 *               review:
 *                 type: string
 *                 description: Updated review text.
 *     responses:
 *       200:
 *         description: Rating updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       404:
 *         description: Rating not found.
 *       500:
 *         description: Server error.
 *
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       properties:
 *         hall_id:
 *           type: string
 *           description: The ID of the venue.
 *         user_phone:
 *           type: string
 *           description: The phone number of the user who submitted the rating.
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: The rating value (1-5).
 *         review:
 *           type: string
 *           description: The review text.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the rating was created.
 */
