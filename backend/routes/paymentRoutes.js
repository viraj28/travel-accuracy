const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const { createOrder } = require('../controllers/paymentController');

router.post('/create-order', protect, createOrder);

module.exports = router;
