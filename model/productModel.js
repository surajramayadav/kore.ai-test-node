const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};
const productScehma = new mongoose.Schema({
  milk_quantity: {
    type: 'Number',
    ref: '',
    required: false,
    unique: false,
    maxlength: ['10', 'milk_quantity should be less than 10 character'],
    default: 100
  },
  milk_price: {
    type: 'Number',
    ref: '',
    required: false,
    unique: false,
    maxlength: ['5', 'milk_price should be less than 5 character'],
    default: 60
  },
  date: {
    type: 'String',
    ref: '',
    required: false,
    unique: false,
    maxlength: ['10', 'Date is required'],
  }
}, schemaOptions);


module.exports = mongoose.model("product", productScehma);