const express = require('express');
const router = express.Router();

const { getKeys } = require('../controllers/mailController');

router.get('/', getKeys);

module.exports = router;
