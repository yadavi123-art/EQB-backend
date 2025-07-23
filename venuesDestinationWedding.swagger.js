/**
 * @swagger
 * tags:
 *   name: Venues - Destination Wedding
 *   description: API for retrieving venues that offer only destination wedding plans
 */

/**
 * @swagger
 * /venues/destinationWeddingOnly:
 *   get:
 *     summary: Get venues that offer only destination wedding plans
 *     tags: [Venues - Destination Wedding]
 *     description: Retrieves a list of venues that have explicitly marked themselves as offering destination wedding plans. The response includes all venue details, including their destination wedding packages and populated inclusions.
 *     responses:
 *       200:
 *         description: A list of venues offering destination wedding plans.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venue' # Referencing the existing Venue schema
 *       404:
 *         description: No venues offering destination wedding plans found.
 *       500:
 *         description: Internal Server Error
 */
