const mongoose = require('mongoose');
const Order = require('./orderModel');

const orderDetailSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'Order',
  },
  package_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'Restaurant',
  },
  package_cost: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);
