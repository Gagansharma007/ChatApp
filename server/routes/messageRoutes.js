const router = require('express').Router();
const { sendMessage, getMessage } = require('../controllers/messageController');
const protect = require('../middleware/authMiddleware');
router.post('/send/:id', protect , sendMessage );
router.get('/:id', protect, getMessage );
module.exports = router;