
# EQBook - Venue Booking System

## Overview
EQBook is a comprehensive venue booking system designed to connect users with event venues. The platform allows users to search, book, and manage venue reservations while providing venue owners with tools to manage their listings and bookings.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Swagger for API documentation

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/EQB-backend.git
    cd EQB-backend
    ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables: Create a `.env` file in the root directory with the following variables:

   ```javascript
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=mongodb://127.0.0.1/EQBook
   PORT=3000
   ```

## Running the Application

- Development mode:

  ```bash
  npm run dev
  ```

- Production mode:

  ```bash
  npm start
  ```

## API Documentation

API documentation is available via Swagger UI at `/api-docs` when the server is running.

## Project Structure

- `/models` - Database schemas and models
- `/routes` - API routes organized by feature
- `/middleware` - Custom middleware functions
- `/services` - Business logic and services
- `/config` - Configuration files

## Features

- User authentication (signup, login, password reset)
- Admin authentication and management
- Venue listing and management
- Booking system with availability checking
- Ratings and reviews
- Wishlist functionality
- Special offers and promotions
- Search functionality (by date, price, location)
- Destination wedding packages
- Venue add-ons and inclusions

## License

ISC


4. Commit and push changes:
    ```bash
    git add README.md
    git commit -m "Add comprehensive README.md with project documentation"
    git push -u origin feature/add-readme
    ```

5. Create a pull request on GitHub to merge into main branch.
