const mongoose = require('mongoose');

const packageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    packageImages: [String],
    title: {
      type: String,
      required: [true, 'Please add a Package Name'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    duration: {
      type: String,
      required: [true, 'Please add duration'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a Price for the Package'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Package', packageSchema);
