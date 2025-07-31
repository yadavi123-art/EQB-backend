const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepageController');

// Get all homepage content
router.get('/', homepageController.getAllHomepageContent);

// Create new homepage content
router.post('/', homepageController.createHomepageContent);

// Update homepage content
router.put('/:id', homepageController.updateHomepageContent);

// Delete homepage content
router.delete('/:id', homepageController.deleteHomepageContent);

module.exports = router;
