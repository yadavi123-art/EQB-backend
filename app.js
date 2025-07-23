const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
require('dotenv').config(); // Load environment variables

const db = require('./db.js'); // Import the database connection
const User = require('./schema.js'); // Require the user schema
require('./inclusion.js'); // Require the inclusion schema
require('./destinationWeddingPage.js'); // Require the destination wedding page schema
const signupRoute = require('./signup.js');
const loginRoute = require('./login.js');
const forgotPasswordRoute = require('./forgotPassword.js');
const adminRegisterRoute = require('./adminRegister.js');
const adminLoginRoute = require('./adminLogin.js');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger.js');

const homepageRoute = require('./homepage.js');
const offerRoute = require('./offer.js');
const wishlistRoute = require('./wishlist.js');
const ratingRoute = require('./rating.js');
const availabilityRoute = require('./availability.js');
const bookingRoute = require('./booking.js');
const { searchVenuesByDateOrPrice } = require('./searchByDate.js');
const { getPopularOffers } = require('./popularOffers.js');
const userManagementRoute = require('./userManagement.js');
const userProfileRoute = require('./userProfile.js'); // New import
const bookingReportsRoute = require('./bookingReports.js'); // New import
const inclusionsRoute = require('./inclusions.js'); // New import
const destinationWeddingRoute = require('./destinationWedding.js'); // New import
const destinationWeddingPageRoutes = require('./destinationWeddingPageRoutes.js'); // New import

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { displayOperationId: true }));
app.use('/auth', signupRoute);
app.use('/auth', loginRoute);
app.use('/auth', forgotPasswordRoute);
app.use('/auth', adminRegisterRoute);
app.use('/auth', adminLoginRoute);
app.use('/homepage', homepageRoute);
app.use('/offers', offerRoute);
app.use('/wishlist', wishlistRoute);
app.use('/ratings', ratingRoute);
app.use('/availability', availabilityRoute);
app.use('/bookings', bookingRoute);
app.use('/', userManagementRoute);
app.use('/user', userProfileRoute); // New route for user profile
app.use('/reports', bookingReportsRoute); // New route for booking reports
app.use('/inclusions', inclusionsRoute); // New route for inclusions
app.use('/venues', destinationWeddingRoute); // New route for destination wedding
app.use('/destinationWeddingPage', destinationWeddingPageRoutes); // New route for destination wedding page

app.get('/venues/searchByDate', async (req, res) => {
  try {
    const { date, price, location } = req.query;
    const venues = await searchVenuesByDateOrPrice(date, price, location);
    res.json(venues);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const hallRoute = require('./hall.js');
app.use('/halls', hallRoute);

const { searchVenues } = require('./searchVenues.js');

app.get('/venues/search', async (req, res) => {
  try {
    const { query, location } = req.query;
    const venues = await searchVenues(query, location);
    res.json(venues);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// New route for popular venues
/**
 * @swagger
 * /popularVenues:
 *   get:
 *     summary: Get top 6 popular venues with highest ratings for slider
 *     tags: [Popular Venues]
 *     description: Returns a list of the top 6 popular venues, sorted by their highest average rating. This endpoint is specifically for displaying popular venues in a slider.
 *     responses:
 *       200:
 *         description: A list of the top 6 popular venues.
 */
app.get('/popularVenues', async (req, res) => {
  try {
    const { getPopularVenues } = require('./popularVenues');
    const popularVenues = await getPopularVenues();
    res.json(popularVenues);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /venues/sortByPrice:
 *   get:
 *     summary: Get venues sorted by price
 *     tags: [Venues]
 *     description: Returns a list of venues sorted by price in descending order.
 *     responses:
 *       200:
 *         description: A list of venues sorted by price.
 */
app.get('/venues/sortByPrice', async (req, res) => {
  try {
    const { getVenuesSortedByPrice } = require('./sortByPrice');
    const venues = await getVenuesSortedByPrice();
    res.json(venues);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

mongoose.connect('mongodb://127.0.0.1/EQBook')
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
  });

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout
 *     tags: [Authentication]
 *     description: Logs out the user by clearing the authentication token.
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 */
app.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

/**
 * @swagger
 * /popularOffers:
 *   get:
 *     summary: Get top 6 offers with highest rated venue details for slider
 *     tags: [Offer]
 *     description: Returns a list of the top 6 offers, sorted by the average rating of their associated venues in descending order. This endpoint is specifically for displaying popular offers in a slider.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the offer.
 *                   image:
 *                     type: string
 *                     description: The URL of the venue image.
 *                   venueName:
 *                     type: string
 *                     description: The name of the venue.
 *                   venue_id:
 *                     type: string
 *                     description: The ID of the venue.
 *                   location:
 *                     type: string
 *                     description: The location of the venue.
 *                   discount_percent:
 *                     type: number
 *                     description: The discount percentage of the offer.
 *                   averageRating:
 *                     type: number
 *                     description: The average rating of the venue.
 *                   description:
 *                     type: string
 *                     description: A brief description of the offer.
 *       500:
 *         description: Server error
 */
app.get('/popularOffers', async (req, res) => {
  try {
    const popularOffers = await getPopularOffers();
    res.json(popularOffers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
