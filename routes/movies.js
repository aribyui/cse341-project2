const express = require('express');
const router = express.Router();
const moviesControllers = require('../controllers/movies');
const { postPutSharedRules, validate } = require('../validators/movies-validator');
const { isAuthenticated } = require('../validators/authenticate');

router.get('/', moviesControllers.getMovies);

router.post('/', isAuthenticated, postPutSharedRules, validate, moviesControllers.addMovie);

router.put('/:id', isAuthenticated, postPutSharedRules, validate, moviesControllers.updateMovie);

router.delete('/:id', isAuthenticated, moviesControllers.deleteMovie);

module.exports = router;