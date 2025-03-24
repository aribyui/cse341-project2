const express = require('express');
const router = express.Router();
const booksControllers = require('../controllers/books');
const { postPutSharedRules, validate } = require('../validators/books-validator');

router.get('/books', booksControllers.getBooks);

router.post('/books', postPutSharedRules, validate, booksControllers.addBook);

router.put('/books/:id', postPutSharedRules, validate, booksControllers.updateBook)

router.delete('/books/:id', booksControllers.deleteBook)

module.exports = router;