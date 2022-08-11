
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ErrorHandler = require("./errorHandler");

// JWT TOKEN
const getJWTToken = async function (customer) {
  return await jwt.sign({ id: customer._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const comparePassword = async function (enteredpassword, customer) {
  return await bcrypt.compare(enteredpassword, customer.password);
};

module.exports = { getJWTToken, comparePassword };
