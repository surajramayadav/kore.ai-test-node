
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const customerModel = require("../model/customerModel");
const orderModel = require("../model/orderModel");
const productModel = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");

// Add order
exports.addorder = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await productModel.findById(req.body.product);
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
    const Quantity = product.milk_quantity - req.body.milk_quantity

    const updateQuantity = {
      milk_quantity: Quantity
    }

    product = await productModel.findByIdAndUpdate(req.body.product, updateQuantity, {
      new: true,
      runValidators: true,
      productFindAndModify: false,
    });

    const order = await orderModel.create(req.body);

    res.status(200).json({
      success: true,
      data: order,
    });


  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get order Using Id
exports.vieworderById = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("order not found", 404));
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all order
exports.vieworder = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await orderModel.find();
    if (!order) {
      return next(new ErrorHandler("order not found", 404));
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete order
exports.deleteorder = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await orderModel.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("order not found", 404));
    }
    order = await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "order deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update order
exports.updateorder = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await orderModel.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("order not found", 404));
    }


    order = await orderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      orderFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});



