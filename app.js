const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const db = require('./db.js'); // Import the database connection
const User = require('./schema.js'); // Require the user schema
const signupRoute = require('./signup.js');
const loginRoute = require('./login.js');
const forgotPasswordRoute = require('./forgotPassword.js');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger.js');

const homepageRoute = require('./homepage.js');
const offerRoute = require('./offer.js');
const wishlistRoute = require('./wishlist.js');
const ratingRoute = require('./rating.js');
const availabilityRoute = require('./availability.js');
const bookingRoute = require('./booking.js');
const { searchVenuesByDateOrPrice } = require('./searchByDate.js');


app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { displayOperationId: true }));
app.use('/auth', signupRoute);
app.use('/auth', loginRoute);
app.use('/auth', forgotPasswordRoute);
app.use('/homepage', homepageRoute);
app.use('/offers', offerRoute);
app.use('/wishlist', wishlistRoute);
app.use('/ratings', ratingRoute);
app.use('/availability', availabilityRoute);
app.use('/bookings', bookingRoute);

app.get('/venues/searchByDate', async (req, res) => {
  try {
    const { date, price } = req.query;
    const venues = await searchVenuesByDateOrPrice(date, price);
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
 *     summary: Get top 6 popular venues with highest ratings
 *     tags: [Popular Venues]
 *     description: Returns a list of the top 6 popular venues, sorted by their highest average rating.
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
