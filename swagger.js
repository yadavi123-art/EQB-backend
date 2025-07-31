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
  apis: [
    './app.js',
    './controllers/**/*.js',
    './routes/**/*.js',
    './login.swagger.js',
    './adminRegister.swagger.js',
    './adminLogin.swagger.js',
    './offer.swagger.js',
    './hall.swagger.js',
    './search.swagger.js',
    './rating.swagger.js',
    './availability.swagger.js',
    './booking.swagger.js',
    './searchByDate.swagger.js',
    './bookingReports.js',
    './inclusions.swagger.js', // New Swagger documentation for inclusions
    './destinationWedding.swagger.js', // New Swagger documentation for destination wedding
    './destinationWeddingPage.swagger.js', // New Swagger documentation for destination wedding page
    './venuesDestinationWedding.swagger.js', // New Swagger documentation for venues offering destination wedding
    './venueAddons.swagger.js' // New Swagger documentation for venue add-ons
  ], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
