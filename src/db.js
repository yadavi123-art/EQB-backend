const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost:27017'; // Replace with your actual MongoDB connection string

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

const db = mongoose.connection;

module.exports = db;
