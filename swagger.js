const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Booking API',
      version: '1.0.0',
      description: 'API documentation for the Booking application',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./app.js', './signup.js', './login.js', './login.swagger.js', './forgotPassword.js', './adminRegister.swagger.js', './adminLogin.swagger.js', './homepage.js', './offer.js', './offer.swagger.js', './wishlist.js', './hall.swagger.js', './search.swagger.js', './rating.swagger.js', './availability.swagger.js', './booking.swagger.js', './searchByDate.swagger.js', './userManagement.js', './userProfile.js', './bookingReports.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
