const asyncHandler = require('express-async-handler');

/***
 * @desc Get all packages
 * @route GET /api/packages
 * @access Private
 */
const getpackage = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get: Package list' });
});

/***
 * @desc Create a new package
 * @route POST /api/packages
 * @access Private
 */
const setPackage = asyncHandler(async (req, res) => {
  console.log(req.body);

  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add title');
  }

  if (!req.body.description) {
    res.status(400);
    throw new Error('Please add description');
  }

  if (!req.body.price) {
    res.status(400);
    throw new Error('Please add price');
  }

  res.status(200).json({ message: 'Post: Set Package ' });
});

/***
 * @desc Update a package
 * @route PUT /api/packages/:id
 * @access Private
 */
const updatePackage = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Put: Update Package ${req.params.id}` });
});

/***
 * @desc Delete a package
 * @route DELETE /api/packages/:id
 * @access Private
 */
const deletePackage = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete: Delete Package ${req.params.id} ` });
});

module.exports = {
  getpackage,
  setPackage,
  updatePackage,
  deletePackage,
};
