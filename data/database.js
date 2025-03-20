const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGODB_URL
const client = new MongoClient(url);

// 📝 Database Setup Guide - https://tinyurl.com/mv46nht3  
async function connectDb() {

  try {
    await client.connect();
    console.log('Connected to MongoDB database 🚀');

    // 📝 Node y Mongo: Conexión entre Node.js y MongoDB
    // https://tinyurl.com/3aw98f9e
    return client;
  } catch (err) {
    console.log('Failed to connect to MongoDB database.');
    console.log('Please check your connection ❌', err);
  }

};

module.exports = { connectDb, client }