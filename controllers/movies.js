const { client } = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

async function getMovies(req, res) {
  try {
    const moviesCollection = await client.db().collection('movies').find().toArray();
    res.status(200).json(moviesCollection);
  } catch (err) {
    res.status(500).send('Error fetching movies');
  }
};

async function addMovie(req, res) {
  try {
    const moviesCollection = client.db().collection('movies');
    const doc = {
      title: req.body.title,
      director: req.body.director,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      contentRating: req.body.contentRating,
      duration: req.body.duration,
      rating: req.body.rating,
      description: req.body.description
    }
    await moviesCollection.insertOne(doc);
    res.status(201).send('Movie successfully added.')
  } catch (err) {
    res.status(500).send('Movie adding the book.');
  }
};

async function updateMovie(req, res) {
  try {
    const moviesCollection = client.db().collection('movies');
    const movieId = new ObjectId(req.params.id);
    const doc = {
      title: req.body.title,
      director: req.body.director,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      contentRating: req.body.contentRating,
      duration: req.body.duration,
      rating: req.body.rating,
      description: req.body.description
    }
    await moviesCollection.updateOne({ _id: movieId }, { $set: doc });
    res.status(200).send('Movie successful updated');
  } catch (err) {
    res.status(400).send('Error updating the movie');
  }
};

async function deleteMovie(req, res) {
  try {
    const moviesCollection = client.db().collection('movies');
    const movieId = new ObjectId(req.params.id);
    await moviesCollection.deleteOne({ _id: movieId });
    res.status(200).send('Movie successfully deleted.');
    200
  } catch (err) {
    res.status(400).send('Invalid request. Could not delete the document.')
  }
};

module.exports = { getMovies, addMovie, updateMovie, deleteMovie };