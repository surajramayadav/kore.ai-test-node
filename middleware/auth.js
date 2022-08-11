const ErrorHandler = require("../utils/errorHandler");
    const catchAsyncErrors = require("./catchAsyncErrors");
    const jwt = require('jsonwebtoken');
    
    const customer = require("../model/customerModel");
    
    exports.isAuthenticatedcustomer = catchAsyncErrors(async (req, res, next) => {
        const { token } = req.cookies
        const Accesstoken =req.header('authorization');
        
        // const token = Accesstoken.replace('Bearer ',"")
    
        if (!token) {
            return next(new ErrorHandler("Please Login to access this resource", 401))
        }
    
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    
        req.customer = await customer.findById(decodedData.id).select("+role")
    
        // console.log(req.customer)
    
        next()
    })
    
    exports.authorizeRoles = (...roles) => {
        return catchAsyncErrors(async (req, res, next) => {
            if (!roles.includes(req.customer.role)) {
                return next(new ErrorHandler("Role is not allowed to access this resource", 403))
            }
    
            next()
        })
    }