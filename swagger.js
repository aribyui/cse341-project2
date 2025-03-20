const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'cse341-project2',
    description: 'API for managing books with CRUD operations using Node.js, Express, and MongoDB.'
  },
  host: 'localhost:8080',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);