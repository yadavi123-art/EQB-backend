const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const db = require('./db.js'); // Import the database connection
const User = require('./schema.js'); // Require the user schema
const signupRoute = require('./signup.js');
const loginRoute = require('./login.js');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger.js');

const homepageRoute = require('./homepage.js');
const offerRoute = require('./offer.js');
const wishlistRoute = require('./wishlist.js');

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/auth', signupRoute);
app.use('/auth', loginRoute);
app.use('/homepage', homepageRoute);
app.use('/offers', offerRoute);
app.use('/wishlist', wishlistRoute);

// New route for popular venues
/**
 * @swagger
 * /popularVenues:
 *   get:
 *     summary: Get popular venues
 *     tags: [Popular Venues]
 *     description: Returns a list of popular venues with ratings greater than 4.
 *     responses:
 *       200:
 *         description: A list of popular venues.
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
