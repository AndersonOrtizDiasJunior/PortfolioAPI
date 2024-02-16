const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');
dotenv.config();

const doc = {
  info: {
    title: "RPG Sheet API",
    description: "RPG Sheet API",
  },
  host: process.env.SWAGGERHOST,
  schemes: [process.env.SWAGGERSCHEME]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
