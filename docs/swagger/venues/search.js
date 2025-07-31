/**
 * @swagger
 * /venues/search:
 *   get:
 *     summary: Search for venues by name or location
 *     tags: [Venues]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Name of the venue to search for (case-insensitive, partial match)
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Location of the venue to search for (case-insensitive, partial match)
 *     responses:
 *       200:
 *         description: A list of venues matching the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venue'
 *       500:
 *         description: Internal Server Error
 */
