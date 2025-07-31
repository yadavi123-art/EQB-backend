const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../../controllers/auth/authController');
const adminAuthController = require('../../controllers/auth/adminAuthController');

// User authentication routes
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.post('/logout', authController.logout);

// Admin authentication routes
router.post('/admin/login', adminAuthController.login);
router.post('/admin/register', adminAuthController.register);

module.exports = router;
