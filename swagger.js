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
    './docs/swagger/auth/**/*.js',
    './docs/swagger/inclusions/**/*.js',
    './docs/swagger/bookings/**/*.js',
    './docs/swagger/venues/**/*.js',
    './docs/swagger/users/**/*.js',
    './docs/swagger/offers/**/*.js',
    './docs/swagger/ratings/**/*.js',
    './docs/swagger/homepage/**/*.js',
    './docs/swagger/wishlist/**/*.js',
    // './app.js',
    // './controllers/**/*.js',
    // './routes/**/*.js',
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
