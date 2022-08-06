const express = require('express');
const {
  getpackage,
  updatePackage,
  setPackage,
  deletePackage,
} = require('../controllers/packageController');
const router = express.Router();

router.route('/').get(getpackage).post(setPackage);
router.route('/:id').put(updatePackage).delete(deletePackage);

module.exports = router;
