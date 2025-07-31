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
