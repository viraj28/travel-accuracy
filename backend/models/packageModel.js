const mongoose = require('mongoose');

const packageSchema = mongoose.Schema(
  {
    packageImage: {
      type: String,
    },
    title: {
      type: String,
      required: [true, 'Please add a Package Name'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Package', packageSchema);
