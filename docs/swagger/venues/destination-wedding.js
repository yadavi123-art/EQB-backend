/**
 * @swagger
 * components:
 *   schemas:
 *     DestinationWeddingPackage:
 *       type: object
 *       required:
 *         - package_name
 *       properties:
 *         package_name:
 *           type: string
 *           description: Name of the wedding package (e.g., Silver, Gold, Bronze).
 *         description:
 *           type: object
 *           properties:
 *             theme:
 *               type: string
 *               description: Theme of the wedding (e.g., Beachside, Royal).
 *             duration:
 *               type: string
 *               description: Duration of the wedding package (e.g., 2-day, 3-day).
 *             location_vibe:
 *               type: string
 *               description: Vibe of the location (e.g., Seaside, Palace).
 *             audience:
 *               type: string
 *               description: Target audience size (e.g., Intimate, Grand).
 *             style:
 *               type: string
 *               description: Wedding style (e.g., Minimalist, Luxury).
 *         price:
 *           type: number
 *           description: Price of the package.
 *         inclusions:
 *           type: array
 *           items:
 *             type: string
 *             description: ID of an inclusion from the Inclusions API.
 *           description: List of inclusion IDs for this package.
 *       example:
 *         package_name: Gold Package
 *         description:
 *           theme: Royal
 *           duration: 3-day
 *           location_vibe: Palace
 *           audience: mid-size
 *           style: Traditional
 *         price: 15000
 *         inclusions: ["60d0fe4f5e3a4b001c8e4d1a", "60d0fe4f5e3a4b001c8e4d1b"]
 */

/**
 * @swagger
 * tags:
 *   name: Destination Wedding
 *   description: API for managing destination wedding plans for venues
 */

/**
 * @swagger
 * /venues/{venue_id}/destinationWedding:
 *   put:
 *     summary: Update destination wedding details for a venue
 *     tags: [Destination Wedding]
 *     parameters:
 *       - in: path
 *         name: venue_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the venue to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               offers_destination_wedding:
 *                 type: boolean
 *                 description: Indicates if the venue offers destination wedding plans.
 *               destination_wedding_packages:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/DestinationWeddingPackage'
 *                 description: Array of destination wedding packages offered by the venue.
 *             example:
 *               offers_destination_wedding: true
 *               destination_wedding_packages:
 *                 - package_name: Silver Package
 *                   description:
 *                     theme: Beachside
 *                     duration: 2-day
 *                     location_vibe: Seaside
 *                     audience: Intimate (under 50)
 *                     style: Minimalist
 *                   price: 8000
 *                   inclusions: ["60d0fe4f5e3a4b001c8e4d1a"]
 *                 - package_name: Gold Package
 *                   description:
 *                     theme: Royal
 *                     duration: 3-day
 *                     location_vibe: Palace
 *                     audience: mid-size
 *                     style: Traditional
 *                   price: 15000
 *                   inclusions: ["60d0fe4f5e3a4b001c8e4d1a", "60d0fe4f5e3a4b001c8e4d1b"]
 *     responses:
 *       200:
 *         description: Venue destination wedding details updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venue'
 *       404:
 *         description: Venue not found.
 *       500:
 *         description: Internal Server Error
 */
