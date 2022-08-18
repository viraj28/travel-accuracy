const asyncHandler = require('express-async-handler');

const Inquiry = require('../models/inquiryModel');
const Package = require('../models/packageModel');
const User = require('../models/userModel');

/***
 * @route POST api/inquire/:packageId
 * @desc Create an inquiry
 * @access Private
 */
const createInquiry = asyncHandler(async (req, res) => {
  let package;
  let userId = req.user.id;

  if (!userId) {
    res.status(400);
    throw new Error('Please login to make an inquiry');
  }

  if (req.params.packageId.match(/^[0-9a-fA-F]{24}$/)) {
    package = await Package.findById(req.params.packageId);
  }

  if (!package) {
    res.status(400);
    throw new Error('Package not found');
  }

  const inquiry = await Inquiry.create({
    package: package.id,
    user: userId,
    text: req.body.text,
    phone: req.body.phone,
  });

  res.status(200).json(inquiry);
});

/***
 * @route GET api/inquire/all
 * @desc Get all inquiries
 * @access Private
 */
const getAll = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find({});

  res.status(200).json({
    data: inquiries,
  });
});

module.exports = {
  createInquiry,
  getAll,
};
