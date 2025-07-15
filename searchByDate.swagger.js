/**
 * @swagger
 * /venues/searchByDate:
 *   get:
 *     summary: Search for venues available on a specific date or by price
 *     tags: [Venues]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: The date to check for venue availability (YYYY-MM-DD).
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *         required: false
 *         description: The maximum price of the venue.
 *     responses:
 *       200:
 *         description: A list of venues available on the specified date or within the specified price range.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venue'
 *       500:
 *         description: Internal Server Error
 */
