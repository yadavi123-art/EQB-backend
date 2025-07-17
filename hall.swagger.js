/**
 * @swagger
 * tags:
 *   name: Halls
 *   description: API to manage halls
 */

/**
 * @swagger
 * /halls:
 *   get:
 *     summary: Get all halls
 *     tags: [Halls]
 *     responses:
 *       200:
 *         description: Returns a list of halls.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hall'
 *   post:
 *     summary: Create a new hall
 *     tags: [Halls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hall'
 *     responses:
 *       200:
 *         description: Hall created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hall'
 * /halls/{id}:
 *   get:
 *     summary: Get a hall by ID
 *     tags: [Halls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hall to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the hall and its associated offers.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Hall'
 *                 - type: object
 *                   properties:
 *                     offers:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Offer'
 *                     individualRatings:
 *                       type: object
 *                       description: "Counts of individual ratings (e.g., { \"1\": 5, \"2\": 10 })."
 *                       additionalProperties:
 *                         type: number
 *       404:
 *         description: Hall not found.
 *   put:
 *     summary: Update a hall by ID
 *     tags: [Halls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hall to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hall'
 *     responses:
 *       200:
 *         description: Hall updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hall'
 *       404:
 *         description: Hall not found.
 *   delete:
 *     summary: Delete a hall by ID
 *     tags: [Halls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hall to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hall deleted successfully.
 *       404:
 *         description: Hall not found.

 * @swagger
 * components:
 *   schemas:
 *     Hall:
 *       type: object
 *       properties:
 *         hall_name:
 *           type: string
 *           description: The name of the hall.
 *         hall_type:
 *           type: string
 *           description: The type of hall.
 *         location:
 *           type: string
 *           description: The location of the hall.
 *         priceperday:
 *           type: number
 *           description: The price per day.
 *         capacity:
 *           type: number
 *           description: The capacity of the hall.
 *         description:
 *           type: string
 *           description: A detailed description of the hall.
 *         contactmail:
 *           type: string
 *           description: The contact email for the hall.
 *         contact_phone:
 *           type: string
 *           description: The contact phone number for the hall.
 *         availabilty_status:
 *           type: boolean
 *           description: The availability status.
 *         hall_amenities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Amenity'
 *           description: The hall amenities.
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL of the image.
 *               caption:
 *                 type: string
 *                 description: The caption of the image.
 *           description: The images of the hall.
 *         averageRating:
 *           type: number
 *           description: The average rating of the hall.
 *         review:
 *           type: string
 *           description: User review for the hall.
 *         individualRatings:
 *           type: object
 *           description: "Counts of individual ratings (e.g., { \"1\": 5, \"2\": 10 })."
 *           additionalProperties:
 *             type: number
 *       required:
 *         - hall_name
 *         - hall_type
 *         - location
 *         - priceperday
 *         - availabilty_status
 *         - capacity
 *         - description
 *         - contactmail
 *         - contact_phone
 *     Offer:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the offer.
 *         hall_id:
 *           type: string
 *           description: The ID of the venue the offer is for.
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the offer.
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the offer.
 *         discount_percent:
 *           type: number
 *           description: The discount percentage of the offer.
 *     Amenity:
 *       type: object
 *       properties:
 *         ameniti_id:
 *           type: string
 *           description: The amenity ID.
 *         amenity_type:
 *           type: string
 *           description: The type of amenity.
 *         amenity_description:
 *           type: string
 *           description: The amenity description.
 *         amenity_qnt:
 *           type: integer
 *           description: The amenity quantity.
*/