const { Wishlist } = require('../schema.js');

// Add venue to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    console.log("req.user", req.user);
    const { venue_id, image, venueName, ratings, location } = req.body;
    const user_id = req.user.userId; // Assuming authMiddleware adds user info to req

    // Check if the venue already exists in the user's wishlist
    const existingWishlistItem = await Wishlist.findOne({ user_id, venue_id });

    if (existingWishlistItem) {
      return res.status(409).json({ message: 'Venue already in wishlist' });
    }

    const newWishlistItem = new Wishlist({
      user_id,
      venue_id,
      image,
      venueName,
      ratings,
      location,
    });

    await newWishlistItem.save();
    res.status(201).json(newWishlistItem);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get user's wishlist
exports.getUserWishlist = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const wishlistItems = await Wishlist.find({ user_id });
    res.json(wishlistItems);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Remove venue from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { venue_id } = req.params;
    const user_id = req.user.userId;

    const wishlistItem = await Wishlist.findOneAndDelete({ user_id, venue_id });

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.json({ message: 'Venue removed from wishlist' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
