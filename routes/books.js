const express = require('express');
const router = express.Router();
const booksControllers = require('../controllers/books');
const { postPutSharedRules, validate } = require('../validators/books-validator');
const { isAuthenticated } = require('../validators/authenticate');

router.get('/', booksControllers.getBooks);

router.post('/', isAuthenticated, postPutSharedRules, validate, booksControllers.addBook);

router.put('/:id', isAuthenticated, postPutSharedRules, validate, booksControllers.updateBook)

router.delete('/:id', isAuthenticated, booksControllers.deleteBook)

module.exports = router;