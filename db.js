const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27018/EQBook'; // Use env variable with fallback

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
    return mongoose.connection;
  } catch (err) {
    console.log('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  connection: mongoose.connection
};
