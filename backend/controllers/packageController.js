const asyncHandler = require('express-async-handler');

const Package = require('../models/packageModel');

/***
 * @desc Get all packages
 * @route GET /api/packages
 * @access Private
 */
const getpackage = asyncHandler(async (req, res) => {
  const packages = await Package.find();

  res.status(200).json(packages);
});

/***
 * @desc Create a new package
 * @route POST /api/packages
 * @access Private
 */
const setPackage = asyncHandler(async (req, res) => {
  console.log(req.file);
  console.log(req.body);

  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add title');
  }

  if (!req.body.description) {
    res.status(400);
    throw new Error('Please add description');
  }

  const package = await Package.create({
    packageImage: req.file.path,
    title: req.body.title,
    description: req.body.description,
  });

  res.status(200).json(package);
});

/***
 * @desc Update a package
 * @route PUT /api/packages/:id
 * @access Private
 */
const updatePackage = asyncHandler(async (req, res) => {
  let package;
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    package = await Package.findById(req.params.id);
  }

  if (!package) {
    res.status(400);
    throw new Error('Package not found');
    process.exit(1);
  }

  const updatedPackage = await Package.findByIdAndUpdate(
    req.params.id,
    {
      packageImage: req.file.path,
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
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    package = await Package.findById(req.params.id);
  }

  if (!package) {
    res.status(400);
    throw new Error('Package not found');
    process.exit(1);
  }

  let id = package.id;
  await package.remove();
  res.status(200).json(id);
});

module.exports = {
  getpackage,
  setPackage,
  updatePackage,
  deletePackage,
};
