/**
 * @swagger
 * components:
 *   schemas:
 *     Addon:
 *       type: object
 *       required:
 *         - addon_name
 *         - price
 *       properties:
 *         addon_name:
 *           type: string
 *           description: The name of the add-on (e.g., "Extra Lighting").
 *         description:
 *           type: string
 *           description: A brief description of the add-on.
 *         price:
 *           type: number
 *           description: The price of the add-on.
 *         is_available:
 *           type: boolean
 *           description: Indicates if the add-on is currently available.
 *           default: true
 *       example:
 *         addon_name: Sound System
 *         description: Professional sound system for events.
 *         price: 300
 *         is_available: true
 */

/**
 * @swagger
 * tags:
 *   name: Venue Addons
 *   description: API for managing add-on options for venues
 */

/**
 * @swagger
 * /venues/{venue_id}/addons:
 *   put:
 *     summary: Update add-ons for a specific venue
 *     tags: [Venue Addons]
 *     parameters:
 *       - in: path
 *         name: venue_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the venue to update add-ons for.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addons:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Addon'
 *                 description: An array of add-on objects to replace the existing add-ons for the venue.
 *             example:
 *               addons:
 *                 - addon_name: Extra Lighting Package
 *                   description: Enhanced lighting for events.
 *                   price: 200
 *                   is_available: true
 *                 - addon_name: DJ Services
 *                   description: Professional DJ for music and entertainment.
 *                   price: 500
 *                   is_available: true
 *     responses:
 *       200:
 *         description: Venue add-ons updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venue'
 *       404:
 *         description: Venue not found.
 *       500:
 *         description: Internal Server Error
 */
