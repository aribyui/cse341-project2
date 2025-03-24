const express = require('express')
const router = express.Router()
const moviesControllers = require('../controllers/movies');
const { postPutSharedRules, validate } = require('../validators/movies-validator')

router.get('/movies', moviesControllers.getMovies);

router.post('/movies', postPutSharedRules, validate, moviesControllers.addMovie);

router.put('/movies/:id', postPutSharedRules, validate, moviesControllers.updateMovie);

router.delete('/movies/:id', moviesControllers.deleteMovie);

module.exports = router;