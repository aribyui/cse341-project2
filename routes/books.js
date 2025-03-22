const express = require('express');
const router = express.Router();
const booksControllers = require('../controllers/books');
const { postValidationRules, putValidationRules, validate } = require('../validators/validator');

router.get('/books', booksControllers.getBooks);

router.post('/books', postValidationRules, validate, booksControllers.addBook);

router.put('/books/:id', putValidationRules, validate, booksControllers.updateBook)

router.delete('/books/:id', booksControllers.deleteBook)

module.exports = router;