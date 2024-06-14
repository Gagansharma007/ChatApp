const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { authUser, registerUser, logoutUser } = require('../controllers/userController');
router.post('/auth', authUser );
router.post('/register', registerUser );
router.post('/logout', logoutUser );

module.exports = router;