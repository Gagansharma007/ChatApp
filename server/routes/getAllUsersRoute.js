const router = require('express').Router();

const getAllUsers = require('../controllers/getAllUsersController');
const protect = require('../middleware/authMiddleware');

router.get('/', protect , getAllUsers );

module.exports = router;