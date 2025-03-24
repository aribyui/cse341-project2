const express = require('express');
const app = express();
const mongodb = require('./data/database');
const routes = require('./routes/index');
const cors = require('cors');
const port = 8080;

// Database connection
mongodb.connectDb();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/', routes);
// The default error handler - https://tinyurl.com/2zh7fm8k
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send({ message: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`🔥 Web server is running on port: ${port}`);
});