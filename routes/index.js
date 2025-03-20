const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

// Import swagger routes
router.use('/', require('./swagger'))

// Import books routes
router.use('/', require('./books'));

module.exports = router;