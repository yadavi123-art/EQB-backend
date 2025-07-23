/**
 * @swagger
 * components:
 *   schemas:
 *     Inclusion:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the inclusion.
 *         name:
 *           type: string
 *           description: The name of the inclusion (e.g., "catering", "decorations").
 *         description:
 *           type: string
 *           description: A brief description of the inclusion.
 *         category:
 *           type: string
 *           description: The category of the inclusion (e.g., "services", "amenities").
 *       example:
 *         _id: 60d0fe4f5e3a4b001c8e4d1a
 *         name: Catering
 *         description: Full-service catering for events.
 *         category: services
 */

/**
 * @swagger
 * tags:
 *   name: Inclusions
 *   description: API for managing destination wedding inclusions
 */

/**
 * @swagger
 * /inclusions:
 *   post:
 *     summary: Add a new inclusion
 *     tags: [Inclusions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *             example:
 *               name: Photography
 *               description: Professional photography services.
 *               category: services
 *     responses:
 *       201:
 *         description: Inclusion added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inclusion'
 *       500:
 *         description: Internal Server Error
 *   get:
 *     summary: Get all inclusions
 *     tags: [Inclusions]
 *     responses:
 *       200:
 *         description: A list of all inclusions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inclusion'
 *       500:
 *         description: Internal Server Error
 *
 * /inclusions/{id}:
 *   put:
 *     summary: Update an inclusion by ID
 *     tags: [Inclusions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The inclusion ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inclusion'
 *     responses:
 *       200:
 *         description: Inclusion updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inclusion'
 *       404:
 *         description: Inclusion not found.
 *       500:
 *         description: Internal Server Error
 *   delete:
 *     summary: Delete an inclusion by ID
 *     tags: [Inclusions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The inclusion ID
 *     responses:
 *       200:
 *         description: Inclusion deleted successfully.
 *       404:
 *         description: Inclusion not found.
 *       500:
 *         description: Internal Server Error
 */
