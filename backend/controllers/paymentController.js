const asyncHandler = require('express-async-handler');
const shortid = require('shortid');
const Razorpay = require('razorpay');
const Package = require('../models/packageModel');
const Order = require('../models/orderModel');
const OrderDetail = require('../models/orderDetail');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZ_ID,
  key_secret: process.env.RAZ_SECRET,
});

const createOrder = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const pack = await Package.findById(req.body.packageId);
  if (!pack) {
    res.status(404);
    throw new Error('Package not found!');
  }
  console.log(req.user);
  const options = {
    amount: pack?.price * 100,
    currency: 'INR',
    receipt: shortid.generate(),
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);

    const order = new Order({
      order_id: response.id,
      user_id: req.user.id,
    });

    await order.save();

    res.status(201).json({
      success: true,
      id: order.order_id,
      currency: response.currency,
      amount: response.amount,
      user: req.user,
      key_id: process.env.RAZ_ID,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
    throw new Error(error.message);
  }
});

const verifyPayment = asyncHandler(async (req, res) => {
  const {
    order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount_paid,
    orderDetails,
  } = req.body;

  try {
    const order = await Order.findOne({
      order_id,
    });
    if (order) {
      order.is_payment_successful = true;
      order.amount_paid = amount_paid;
      await order.save();

      const generated_signature = crypto
        .createHmac('sha256', process.env.RAZ_SECRET)
        .update(order.order_id + '|' + razorpay_payment_id)
        .digest('hex');

      if (generated_signature === razorpay_signature) {
        order.is_payment_verified = true;
        await order.save();

        const { package_id, package_cost, user_id } = orderDetails;
        const orderDetail = new OrderDetail({
          order_id: order.id,
          package_id,
          package_cost,
          user_id,
        });
        await orderDetail.save();

        return res.status(201).send({
          success: true,
          message: 'Payment verification successful',
        });
      } else {
        return res.status(400).send({
          success: false,
          message: 'Payment verification failed',
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
    throw new Error(err.message);
  }
});

module.exports = {
  createOrder,
  verifyPayment,
};
