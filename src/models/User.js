const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

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
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      trim: true,
      default: '',
      validate: {
        validator(v) {
          return v ? isEmail(v) : true;
        },
        message: '{VALUE} is not a valid email!',
      },
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
