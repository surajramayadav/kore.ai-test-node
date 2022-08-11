const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


const customerScehma = new mongoose.Schema({
  email: {
    type: 'String',
    ref: '',
    required: false,
    maxlength: ['50', 'email should be less than 20 character'],
    unique: true
  },
  password: {
    type: 'String',
    ref: '',
    required: false,
    maxlength: ['10', 'password should be less than 10 character'],
    unique: false
  },
  address: {
    type: 'String',
    ref: '',
    required: false,
    maxlength: ['255', 'address should be less than 255 character'],
    unique: false
  },
  role: {
    type: 'String',
    ref: '',
    required: false,
    maxlength: ['10', 'phone_number should be less than 10 character'],
    unique: false,
    default: "User"
  },
  phone_number: {
    type: 'Number',
    ref: '',
    required: false,
    maxlength: ['10', 'phone_number should be less than 10 character'],
    unique: false
  },
  pincode: {
    type: 'Number',
    ref: '',
    required: false,
    maxlength: ['10', 'pincode should be less than 10 character'],
    unique: false
  },
  state: {
    type: 'String',
    ref: '',
    required: false,
    maxlength: ['20', 'state should be less than 20 character'],
    unique: false
  },
  country: {
    type: 'String',
    ref: '',
    required: false,
    maxlength: ['20', 'country should be less than 20 character'],
    unique: false
  }
});

//  Bcrypt Password
customerScehma.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("customer", customerScehma);