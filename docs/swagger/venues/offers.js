/**
 * @swagger
 * /venues/{venueId}/offers:
 *   get:
 *     summary: Get all offers for a specific venue
 *     tags: [Venues]
 *     description: Returns a list of all offers created for a particular venue, including venue details.
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
 *                   description:
 *                     type: string
 *                     description: A brief description of the offer.
 *       404:
 *         description: No offers found for this venue
 *       500:
 *         description: Server error
 */
