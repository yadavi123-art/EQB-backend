const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DestinationWeddingPage = mongoose.model('DestinationWeddingPage');
const Venue = mongoose.model('Venue'); // To populate featured venues

// GET /destinationWeddingPage - Get the destination wedding page content
router.get('/', async (req, res) => {
  try {
    const pageContent = await DestinationWeddingPage.findOne().populate('featured_venues');
    if (!pageContent) {
      return res.status(404).json({ message: 'Destination Wedding Page content not found' });
    }
    res.status(200).json(pageContent);
  } catch (error) {
    console.error('Error fetching destination wedding page content:', error);
    res.status(500).json({ message: 'Failed to fetch destination wedding page content', error: error.message });
  }
});

// POST /destinationWeddingPage - Create or update the destination wedding page content (Admin only)
router.post('/', async (req, res) => {
  try {
    const { title, description, banner_image_url, sections, featured_venues, testimonials } = req.body;

    let pageContent = await DestinationWeddingPage.findOne();

    if (pageContent) {
      // Update existing content
      pageContent.title = title || pageContent.title;
      pageContent.description = description || pageContent.description;
      pageContent.banner_image_url = banner_image_url || pageContent.banner_image_url;
      pageContent.sections = sections || pageContent.sections;
      pageContent.featured_venues = featured_venues || pageContent.featured_venues;
      pageContent.testimonials = testimonials || pageContent.testimonials;
      pageContent.last_updated = Date.now();
    } else {
      // Create new content
      pageContent = new DestinationWeddingPage({
        title,
        description,
        banner_image_url,
        sections,
        featured_venues,
        testimonials
      });
    }

    await pageContent.save();
    res.status(200).json(pageContent);
  } catch (error) {
    console.error('Error creating/updating destination wedding page content:', error);
    res.status(500).json({ message: 'Failed to create/update destination wedding page content', error: error.message });
  }
});

module.exports = router;
