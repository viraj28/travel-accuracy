const mongoose = require('mongoose');
const User = require('./userModel');

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      // required: true,
    },
    is_payment_successful: {
      type: Boolean,
      default: false,
    },
    amount_paid: {
      type: String,
    },
    is_payment_verified: {
      type: Boolean,
      default: false,
    },
    is_order_processed: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'User',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Order', orderSchema);
