# Swagger Documentation Structure

This directory contains the Swagger documentation for the Booking API, organized by feature/module.

## Directory Structure

- `auth/`: Authentication-related API documentation
  - `admin-login.js`: Admin login endpoint
  - `admin-register.js`: Admin registration endpoint
  - `login.js`: User login endpoint

- `venues/`: Venue-related API documentation
  - `addons.js`: Venue add-ons
  - `availability.js`: Venue availability
  - `destination-wedding.js`: Destination wedding venues
  - `hall.js`: Hall/venue details
  - `search.js`: Venue search
  - `search-by-date.js`: Date-based venue search

- `bookings/`: Booking-related API documentation
  - `booking.js`: Booking endpoints
  - `reports.js`: Booking reports

- `offers/`: Offer-related API documentation
  - `offer.js`: Offer endpoints
  - `popular.js`: Popular offers

- `ratings/`: Rating-related API documentation
  - `rating.js`: Rating endpoints

- `inclusions/`: Inclusions-related API documentation
  - `inclusions.js`: Inclusions endpoints

- `homepage/`: Homepage-related API documentation (placeholder)

- `wishlist/`: Wishlist-related API documentation (placeholder)

- `users/`: User-related API documentation (placeholder)

## Usage

The main Swagger configuration file (`swagger.js` in the project root) automatically includes all files in this directory structure.

To add new API documentation:
1. Create a new JS file in the appropriate subdirectory
2. Use JSDoc-style Swagger annotations to document your API endpoints
3. No need to update the main Swagger configuration file - it will be automatically included
