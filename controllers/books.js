const { client } = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

async function getBooks(req, res) {
  try {
    const booksCollection = await client.db().collection('books').find().toArray();
    res.status(200).json(booksCollection);
  } catch (err) {
    res.status(500).send(`Error fetching books: ${err.message}`);
  }
};

async function addBook(req, res) {
  try {
    const booksCollection = client.db().collection('books');
    const document = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre
    }
    await booksCollection.insertOne(document);
    res.status(201).send('Book successfully added.');
  } catch (err) {
    res.status(500).send('Error adding the book.');
  }
};

async function updateBook(req, res) {
  try {
    const booksCollection = client.db().collection('books');
    const bookId = new ObjectId(req.params.id);
    const doc = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre
    }
    await booksCollection.updateOne({ _id: bookId }, { $set: doc });
    res.status(200).send('Book successfully updated.');
  } catch (err) {
    res.status(400).send('Error updating the book');
  }
};

async function deleteBook(req, res) {
  try {
    const booksCollection = client.db().collection('books');
    const bookId = new ObjectId(req.params.id);
    await booksCollection.deleteOne({ _id: bookId });
    res.status(200).send('Book successfully deleted.');
  } catch (err) {
    res.status(400).send('Invalid request. Could not delete the document.');
  }
};


module.exports = { getBooks, addBook, updateBook, deleteBook };
