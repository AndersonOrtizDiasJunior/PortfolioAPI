const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Portfolio API',
    description: 'My Portfolio API',
  },
  host: 'andersonportfolio.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
