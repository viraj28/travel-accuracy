const express = require('express');

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './backend/uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(new Error('File type not supported'), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 },
//   fileFilter: fileFilter,
// });

const upload = require('../middleware/multer');

const {
    getpackage,
    updatePackage,
    setPackage,
    deletePackage,
} = require('../controllers/packageController');
const { grantAccess } = require('../middleware/accessMiddleware');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router
    .route('/')
    .get(protect, grantAccess('readAny', 'package'), getpackage)
    .post(
        protect,
        grantAccess('createOwn', 'package'),
        upload.array('packageImages', 5),
        setPackage
    );

router
    .route('/:id')
    .put(
        protect,
        grantAccess('updateOwn', 'package'),
        upload.array('packageImages', 5),
        updatePackage
    )
    .delete(protect, grantAccess('deleteOwn', 'package'), deletePackage);

module.exports = router;
