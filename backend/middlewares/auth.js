const User = require('../models/user')
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).populate('freelancer_id');

    next()
};

//test admin route
exports.authorizeRoles = (...roles) => {
    console.log(roles);
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
        }
        next()
    }
}
exports.isACtivated = (...status) => {
    console.log(status);
    return (req, res, next) => {
        if (!status.includes(req.user.status)) {
            return next(
                new ErrorHandler(`Your account is(${req.user.status}) please wait and try again when it is activated.`, 403))
        }
        next()
    }
}