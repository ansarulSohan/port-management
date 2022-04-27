const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  orderTotal: {
    type: Number,
    required: true,
  },
  orderItems: {
    type: Array,
    required: true,
  },
  orderCustomer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderClearance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  orderLocation: {
    port: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    geolocation: {
      type: Array,
      required: true,
    },
  },
});
