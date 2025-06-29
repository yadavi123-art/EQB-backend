const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');

async function searchVenues(query, location) {
  const searchCriteria = {};

  if (query) {
    // Case-insensitive search for venue name
    searchCriteria.hall_name = { $regex: query, $options: 'i' };
  }

  if (location) {
    // Case-insensitive search for location
    searchCriteria.location = { $regex: location, $options: 'i' };
  }

  try {
    // Select only the required fields: images, hall_name, location, averageRating
    const venues = await Venue.find(searchCriteria).select('images hall_name location averageRating');
    return venues;
  } catch (error) {
    console.error('Error searching venues:', error);
    throw new Error('Failed to search venues');
  }
}

module.exports = { searchVenues };
