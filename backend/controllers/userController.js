const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

/***
 * @desc Register new user
 * @route /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, companyName, email, password, phone, role } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  //Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    companyName,
    email,
    password: hashedPassword,
    role,
    phone,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User data');
  }
});

/***
 * @desc Authenticate a user
 * @route /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check if user exists
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User credentials');
  }
});

/***
 * @desc Get user data
 * @route /api/users/me
 * @access Private
 */
const getMe = async (req, res) => {
  const { _id, name, email, role } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
    role,
  });
};

/***
 * @desc Get all users data
 * @route /api/users/all
 * @access Private
 */
const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(200).json({
    data: users,
  });
};

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
};
