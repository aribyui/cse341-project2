const { client } = require('../data/database');

async function getBooks(req, res) {
  try {
    const booksCollection = await client.db().collection('books').find().toArray();
    res.status(200).json(booksCollection);
  } catch (err) {
    res.status(500).send('Error fetching books');
  }
};

async function addBook(req, res) {
  try {
    const booksCollection = client.db().collection('books');
    const document = {
      title: req.body.title,
      author: req.body.author,
      published: req.body.published
    }
    await booksCollection.insertOne(document);
    res.status(201).send('Book successfully added.')
  } catch (err) {    
    res.status(500).send('Error adding the book.')
  }
};

module.exports = { getBooks, addBook };
