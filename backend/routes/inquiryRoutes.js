const express = require('express');
const router = express.Router();

const { createInquiry, getAll } = require('../controllers/inquiryController');
const { grantAccess } = require('../middleware/accessMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.post('/:packageId', protect, createInquiry);
router.get('/all', protect, grantAccess('readAny', 'inquiry'), getAll);

module.exports = router;
