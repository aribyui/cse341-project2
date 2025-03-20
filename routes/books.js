const express = require('express');
const router = express.Router();
const booksControllers = require('../controllers/books');

router.get('/books', booksControllers.getBooks);

router.post('/books', booksControllers.addBook);

module.exports = router;