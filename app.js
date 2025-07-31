const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
require('dotenv').config(); // Load environment variables

const { connectDB } = require('./db.js'); // Import the database connection function
const { User } = require('./schema.js'); // Require the user schema
require('./inclusion.js'); // Require the inclusion schema

// Import route modules
const authRoutes = require('./routes/auth');
const venueRoutes = require('./routes/venues');
const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users');
const offerRoutes = require('./routes/offers');

// Import other routes
const homepageRoute = require('./routes/homepage');
const wishlistRoute = require('./routes/wishlist');
const ratingRoute = require('./routes/ratings');
const inclusionsRoute = require('./routes/inclusions');

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger.js');

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { displayOperationId: true }));

// Use route modules
app.use('/auth', authRoutes);
app.use('/venues', venueRoutes);
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);
app.use('/offers', offerRoutes);

// Use other routes
app.use('/homepage', homepageRoute);
app.use('/wishlist', wishlistRoute);
app.use('/ratings', ratingRoute);
app.use('/inclusions', inclusionsRoute);


// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
  });
