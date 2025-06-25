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
 *         description: Returns the hall.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hall'
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
 *         hall_id:
 *           type: string
 *           description: The hall ID.
 *         hall_type:
 *           type: string
 *           description: The type of hall.
 *         priceperday:
 *           type: number
 *           description: The price per day.
 *         availabilty_status:
 *           type: boolean
 *           description: The availability status.
 *         hall_amenities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Amenity'
 *           description: The hall amenities.
 *       required:
 *         - hall_id
 *         - hall_type
 *         - priceperday
 *         - availabilty_status
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
