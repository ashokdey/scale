const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['unregistered', 'complete'],
      default: 'unregistered',
    },
    googleLocation: {
      loc: {
        coordinates: [],
      },
    },
  },
  { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } },
);

module.exports = mongoose.model('Users', UserSchema);
