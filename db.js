const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/EQBook'; // Replace with your actual MongoDB connection string

mongoose.connect(mongoDB)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

const db = mongoose.connection;

module.exports = db;
