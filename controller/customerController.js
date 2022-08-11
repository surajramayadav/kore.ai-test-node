
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const customerModel = require("../model/customerModel");
const ErrorHandler = require("../utils/errorHandler");

const { getJWTToken } = require("../utils/jwtToken");
const options = {
  expire: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
  httpOnly: true,
};



// Get customer Using Id
exports.viewcustomerById = catchAsyncErrors(async (req, res, next) => {
  try {
    const customer = await customerModel.findById(req.params.id);
    if (!customer) {
      return next(new ErrorHandler("customer not found", 404));
    }
    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all customer
exports.viewcustomer = catchAsyncErrors(async (req, res, next) => {
  try {
    const customer = await customerModel.find();
    if (!customer) {
      return next(new ErrorHandler("customer not found", 404));
    }
    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete customer
exports.deletecustomer = catchAsyncErrors(async (req, res, next) => {
  try {
    let customer = await customerModel.findById(req.params.id);
    if (!customer) {
      return next(new ErrorHandler("customer not found", 404));
    }
    customer = await customer.deleteOne();

    res.status(200).json({
      success: true,
      message: "customer deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update customer
exports.updatecustomer = catchAsyncErrors(async (req, res, next) => {
  try {
    let customer = await customerModel.findById(req.params.id);
    if (!customer) {
      return next(new ErrorHandler("customer not found", 404));
    }

    customer = await customerModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      customerFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


