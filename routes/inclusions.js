const express = require('express');
const router = express.Router();
const inclusionsController = require('../controllers/inclusionsController');

// Add a new inclusion
router.post('/', inclusionsController.addInclusion);

// Get all inclusions
router.get('/', inclusionsController.getAllInclusions);

// Update an inclusion
router.put('/:id', inclusionsController.updateInclusion);

// Delete an inclusion
router.delete('/:id', inclusionsController.deleteInclusion);

module.exports = router;
