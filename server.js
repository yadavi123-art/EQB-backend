const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Venue Schema
const venueSchema = new mongoose.Schema({
  image: String,
  venueName: String,
  ratings: Number,
  location: String
});

const Venue = mongoose.model('Venue', venueSchema);

// Offer Schema
const offerSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  image: String
});

const Offer = mongoose.model('Offer', offerSchema);

// Dummy data for offers
const dummyOffers = [
  { id: 1, title: "20% Off Wedding Venues", description: "Book now and save 20% on select venues!", image: "https://via.placeholder.com/300x200?text=20%25+Off" },
  { id: 2, title: "Free Decoration", description: "Get free decoration services with your booking.", image: "https://via.placeholder.com/300x200?text=Free+Decoration" },
  { id: 3, title: "Complimentary Catering", description: "Enjoy complimentary catering for your event.", image: "https://via.placeholder.com/300x200?text=Complimentary+Catering" },
  { id: 4, title: "Summer Discount", description: "Special discount for summer bookings!", image: "https://via.placeholder.com/300x200?text=Summer+Discount" },
  { id: 5, title: "Weekend Special", description: "Exclusive offers for weekend events.", image: "https://via.placeholder.com/300x200?text=Weekend+Special" },
  { id: 6, title: "Early Bird Offer", description: "Book 3 months in advance and get a bonus.", image: "https://via.placeholder.com/300x200?text=Early+Bird" },
  { id: 7, title: "Corporate Event Package", description: "Tailored packages for corporate gatherings.", image: "https://via.placeholder.com/300x200?text=Corporate+Package" },
  { id: 8, title: "Anniversary Special", description: "Celebrate your anniversary with us!", image: "https://via.placeholder.com/300x200?text=Anniversary+Special" },
  { id: 9, title: "Birthday Bash Deal", description: "Great deals for birthday parties.", image: "https://via.placeholder.com/300x200?text=Birthday+Deal" },
];

// Insert dummy data if collection is empty
Offer.countDocuments().then(count => {
  if (count === 0) {
    Offer.insertMany(dummyOffers)
      .then(() => console.log("Dummy offers inserted"))
      .catch(err => console.error("Error inserting dummy offers:", err));
  }
});

// Get venues with ratings > 4
app.get('/api/venues', async (req, res) => {
  try {
    const venues = await Venue.find({ ratings: { $gt: 4 } });
    res.json(venues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all offers
app.get('/api/offers', async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
