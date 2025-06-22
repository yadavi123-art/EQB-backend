const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Booking API',
      version: '1.0.0',
      description: 'API documentation for the Booking application',
    },
  },
  apis: ['./app.js', './signup.js', './login.js', './homepage.js', './offer.js', './wishlist.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
