const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const { getOtp, verifyOtp } = require('../controllers/otpController');

router.post('/generate', protect, getOtp);
router.post('/verify', protect, verifyOtp);

module.exports = router;
