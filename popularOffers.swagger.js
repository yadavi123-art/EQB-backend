/**
 * @swagger
 * /popularOffers:
 *   get:
 *     summary: Get top 6 offers with highest rated venue details for slider
 *     tags: [Offer]
 *     description: Returns a list of the top 6 offers, sorted by the average rating of their associated venues in descending order. This endpoint is specifically for displaying popular offers in a slider.
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
 */
