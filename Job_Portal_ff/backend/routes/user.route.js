import express from 'express';
import { login, logout, register, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

// User Registration
// Handles user registration, including file uploads if needed
router.post('/register', singleUpload, register);

// User Login
// Handles user login
router.post('/login', login);

// User Logout
// Handles user logout, requires authentication
router.post('/logout', isAuthenticated, logout);

// Update User Profile
// Handles updating user profile, including file uploads if needed, requires authentication
router.put('/profile', isAuthenticated, singleUpload, updateProfile);

export default router;
