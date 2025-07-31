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
    './docs/swagger/**/*.js', // This will include all Swagger files in the new structure
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
