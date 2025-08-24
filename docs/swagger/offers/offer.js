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
 *               description:
 *                 type: string
 *                 description: A brief description of the offer.
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
 *                 offer:
 *                   type: object
 *                   properties:
 *                     hall_id:
 *                       type: string
 *                       description: The ID of the venue.
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       description: The start date of the offer.
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       description: The end date of the offer.
 *                     discount_percent:
 *                       type: number
 *                       description: The discount percentage of the offer.
 *                     description:
 *                       type: string
 *                       description: A brief description of the offer.
 *       404:
 *         description: Offer not found
 *       500:
 *         description: Server error
 *
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
 * # Note: Venue-specific offers endpoint has been moved to /venues/{venueId}/offers
 * # See docs/swagger/venues/offers.js for the updated documentation
 */

/**
 * @swagger
 * /offers:
 *   get:
 *     summary: Get all offers with highest rated venue details
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
 *                   _id:
 *                     type: string
 *                     description: The ID of the offer.
 *                   image:
 *                     type: string
 *                     description: The URL of the venue image.
 *                   venueName:
 *                     type: string
 *                     description: The name of the venue.
 *                   venue_id:
 *                     type: string
 *                     description: The ID of the venue.
 *                   location:
 *                     type: string
 *                     description: The location of the venue.
 *                   discount_percent:
 *                     type: number
 *                     description: The discount percentage of the offer.
 *                   averageRating:
 *                     type: number
 *                     description: The average rating of the venue.
 *                   description:
 *                     type: string
 *                     description: A brief description of the offer.
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
 *               description:
 *                 type: string
 *                 description: A brief description of the offer.
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
