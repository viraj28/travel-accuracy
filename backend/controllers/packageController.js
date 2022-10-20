const asyncHandler = require('express-async-handler');
const fs = require('fs');
const DIR = './backend/uploads';
const Package = require('../models/packageModel');
const User = require('../models/userModel');

/***
 * @desc getPackage -- Get all packages
 * @route GET /api/packages
 * @access Private
 */
const getpackage = asyncHandler(async (req, res) => {
  const packages = await Package.find();

  res.status(200).json(packages);
});

/***
 * @desc setPackage -- Create a new package
 * @route POST /api/packages
 * @access Private
 */
const setPackage = asyncHandler(async (req, res) => {
  console.log(req.files);
  console.log(req.body);

  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add title');
  }

  if (!req.body.description) {
    res.status(400);
    throw new Error('Please add description');
  }
  if (!req.body.duration) {
    res.status(400);
    throw new Error('Please add duration');
  }
  if (!req.body.price) {
    res.status(400);
    throw new Error('Please add price');
  }

  const package = await Package.create({
    packageImages: req.files.map((file) => file.path),
    title: req.body.title,
    description: req.body.description,
    duration: req.body.duration,
    price: req.body.price,
    user: req.user.id,
  });

  res.status(200).json(package);
});

/***
 * @desc updatePackage -- Update a package
 * @route PUT /api/packages/:id
 * @access Private
 */
const updatePackage = asyncHandler(async (req, res) => {
  let package;
  let ownPackage;
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    package = await Package.findById(req.params.id);
    if (package) {
      ownPackage = package.user == req.user.id;
    }
  }

  if (!package) {
    res.status(400);
    throw new Error('Package not found');
  }

  if (!ownPackage && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not your package, no permission ');
  }

  const updatedPackage = await Package.findByIdAndUpdate(
    req.params.id,
    {
      packageImages: req.files
        ? req.files.map((file) => file.path)
        : package.packageImages,
      ...req.body,
    },
    { new: true }
  );

  res.status(200).json(updatedPackage);
});

/***
 * @desc Delete a package
 * @route DELETE /api/packages/:id
 * @access Private
 */
const deletePackage = asyncHandler(async (req, res) => {
  let package;
  let ownPackage;
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    package = await Package.findById(req.params.id);
    if (package) {
      ownPackage = package.user == req.user.id;
    }
  }

  if (!package) {
    res.status(400);
    throw new Error('Package not found');
  }

  if (!ownPackage && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not your package, no permission ');
  }

  let id = package.id;
  let images = package.packageImages;
  //await package.remove();
  res.status(200).json({ id, images });
});

module.exports = {
  getpackage,
  setPackage,
  updatePackage,
  deletePackage,
};
