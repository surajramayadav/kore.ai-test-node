
  const catchAsyncErrors = require("../middleware/catchAsyncErrors");
  const customerModel = require("../model/customerModel");
  const ErrorHandler = require("../utils/errorHandler");
  const { comparePassword, getJWTToken } = require("../utils/jwtToken");
  
  const options = {
  expire: new Date(
  Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
  };

  exports.customerRegister = catchAsyncErrors(async (req, res, next) => {
    
  const customer = await customerModel.create(req.body);
  const token = await getJWTToken(customer);

  res.status(200).cookie("token", token, options).json({
  success: true,
  data: customer,
  token: token,
  });
  });

  exports.customerLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if customer has given password and  email both

  if (!email || !password ) {
  return next(new ErrorHandler("Please enter email and password ", 400));
  }

  const customer = await customerModel.findOne({ email }).select("+password ");

  if (!customer) {
  return next(new ErrorHandler("Invalid email or password ", 401));
  }
  const token = await getJWTToken(customer);
  const isPasswordMatched = await comparePassword(password , customer);

  if (!isPasswordMatched) {
  return next(new ErrorHandler("Invalid email or password ", 401));
  }

  res.status(200).cookie("token", token, options).json({
  success: true,
  data: customer,
  token: token,
  });
  });

  exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {});

  exports.resetPassword = catchAsyncErrors(async (req, res, next) => {});

  exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");

  res.status(200).json({
  success: true,
  message: "Logged Out",
  });
  });
