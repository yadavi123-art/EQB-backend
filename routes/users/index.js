const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const userController = require('../../controllers/users/userController');

// User profile routes (requires authentication)
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

// User management routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
