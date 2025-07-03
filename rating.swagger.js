/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: API to manage hall ratings
 */

/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Submit a new rating for a hall
 *     tags: [Ratings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hall_id
 *               - user_phone
 *               - rating
 *             properties:
 *               hall_id:
 *                 type: string
 *                 description: The ID of the hall being rated.
 *               user_phone:
 *                 type: string
 *                 description: The phone number of the user submitting the rating.
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: The rating given to the hall (1-5).
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
 *         description: Bad request, e.g., user already rated this hall.
 *       500:
 *         description: Server error.
 * /ratings/{hall_id}:
 *   get:
 *     summary: Get all ratings for a specific hall
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: hall_id
 *         required: true
 *         description: ID of the hall to retrieve ratings for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a list of ratings for the specified hall.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rating'
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
 *           description: The ID of the hall.
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
