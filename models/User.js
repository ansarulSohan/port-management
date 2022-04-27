const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // signature: {
  //   privateKey: {
  //     type: String,
  //     required: true,
  //   },
  //   publicKey: {
  //     type: String,
  //     required: true,
  //   },
  // },
  date: {
    type: Date,
    default: Date.now,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    name: {
      type: String,
      trim: true,
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
