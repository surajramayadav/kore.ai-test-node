const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const orderScehma = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'customer',
    required: false,
    maxlength: [255, 'customer should be less than 255 character'],
    unique: false
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'product',
    required: false,
    maxlength: [255, 'product should be less than 255 character'],
    unique: false
  },
  milk_quantity: {
    type: 'Number',
    ref: '',
    required: true,
    unique: false,
    maxlength: [5, 'quantity is required'],
  },
  payment_status: {
    type: 'Boolean',
    ref: '',
    required: false,
    unique: false,
    maxlength: [255, 'payment_status should be less than 255 character'],
    default: false
  },
  delivery_status: {
    type: 'String',
    ref: '',
    required: false,
    unique: false,
    maxlength: [255, 'delivery_status should be less than 255 character'],
    default: 'placed'
  }
}, schemaOptions);


module.exports = mongoose.model("order", orderScehma);