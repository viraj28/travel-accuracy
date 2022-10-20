const asyncHandler = require('express-async-handler');
const shortid = require('shortid');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZ_ID,
  key_secret: process.env.RAZ_SECRET,
});

const createOrder = asyncHandler(async (req, res) => {
  const payment_capture = 1;
  const amount = 499;
  const currency = 'INR';
  console.log(req.body);
  console.log(req.user);
  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  createOrder,
};
