const express = require('express');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './backend/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('File type not supported'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

const {
  getpackage,
  updatePackage,
  setPackage,
  deletePackage,
} = require('../controllers/packageController');

const router = express.Router();

router
  .route('/')
  .get(getpackage)
  .post(upload.single('packageImage'), setPackage);
router
  .route('/:id')
  .put(upload.single('packageImage'), updatePackage)
  .delete(deletePackage);

module.exports = router;
