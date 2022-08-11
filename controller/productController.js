
const moment = require("moment");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const productModel = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");

// Add product
exports.addproduct = catchAsyncErrors(async (req, res, next) => {
  try {
    req.body.date = ((moment().format('L')).replace('/', '-')).replace('/', '-');
    const product = await productModel.create(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });


  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get product Using Id
exports.viewproductById = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all product
exports.viewproduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await productModel.find();
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete product
exports.deleteproduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await productModel.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
    product = await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "product deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update product
exports.updateproduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await productModel.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }


    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      productFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});



//Get product Using date
exports.checkCapacityByDate = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await productModel.findOne({ date: req.params.date });
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});