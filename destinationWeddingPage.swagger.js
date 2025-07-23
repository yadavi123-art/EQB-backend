/**
 * @swagger
 * components:
 *   schemas:
 *     DestinationWeddingPage:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the page content.
 *         title:
 *           type: string
 *           description: The main title of the destination wedding page.
 *         description:
 *           type: string
 *           description: A general description of the destination wedding offerings.
 *         banner_image_url:
 *           type: string
 *           description: URL of the main banner image for the page.
 *         sections:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               heading:
 *                 type: string
 *               content:
 *                 type: string
 *               image_url:
 *                 type: string
 *           description: Array of content sections for the page.
 *         featured_venues:
 *           type: array
 *           items:
 *             type: string
 *             description: ID of a featured venue.
 *           description: List of IDs of venues featured on the page.
 *         testimonials:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               quote:
 *                 type: string
 *               author:
 *                 type: string
 *           description: Array of customer testimonials.
 *         last_updated:
 *           type: string
 *           format: date-time
 *           description: The date and time the page content was last updated.
 *       example:
 *         _id: 60d0fe4f5e3a4b001c8e4d1c
 *         title: Your Dream Destination Wedding
 *         description: Plan your perfect wedding with our exclusive destination wedding venues.
 *         banner_image_url: https://example.com/banner.jpg
 *         sections:
 *           - heading: Why Choose a Destination Wedding?
 *             content: Experience a unique celebration in breathtaking locations.
 *             image_url: https://example.com/section1.jpg
 *         featured_venues: ["60d0fe4f5e3a4b001c8e4d1d", "60d0fe4f5e3a4b001c8e4d1e"]
 *         testimonials:
 *           - quote: Our wedding was magical, thanks to this platform!
 *             author: Jane Doe
 */

/**
 * @swagger
 * tags:
 *   name: Destination Wedding Page
 *   description: API for managing the content of the Destination Wedding landing page
 */

/**
 * @swagger
 * /destinationWeddingPage:
 *   get:
 *     summary: Get the destination wedding page content
 *     tags: [Destination Wedding Page]
 *     responses:
 *       200:
 *         description: The content of the destination wedding page.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DestinationWeddingPage'
 *       404:
 *         description: Destination Wedding Page content not found.
 *       500:
 *         description: Internal Server Error
 *   post:
 *     summary: Create or update the destination wedding page content
 *     tags: [Destination Wedding Page]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DestinationWeddingPage'
 *     responses:
 *       200:
 *         description: Destination Wedding Page content created/updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DestinationWeddingPage'
 *       500:
 *         description: Internal Server Error
 */
