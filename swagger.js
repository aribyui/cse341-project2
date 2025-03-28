const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'cse341-project2',
    description: 'API for managing books with CRUD operations using Node.js, Express, and MongoDB.'
  },
  host: 'https://cse341-project2-abrs.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);