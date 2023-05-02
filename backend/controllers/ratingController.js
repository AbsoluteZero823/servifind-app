const { reset } = require('nodemon');
const Rating = require('../models/rating');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
// const  Category  = require('../models/category');

exports.newRating = async (req, res, next) => {
    console.log(req.body);
    // req.body.user = req.user.id;
    const rating = await Rating.create(req.body);

    res.status(201).json({
        success: true,
        rating
    })
}

//all Ratings
exports.getRatings = async (req, res, next) => {


    const ratings = await Rating.find().populate([{
        path: 'inquiry_id',

        populate: { path: 'customer' }
    },
    {
        path: 'inquiry_id',
        model: 'Inquiry',
        populate: {
            path: 'freelancer',
            model: 'Freelancer',
            populate: {
                path: 'user_id',
                model: 'user'
            }
        }
    },
    {
        path: 'inquiry_id',
        model: 'Inquiry',
        populate: {
            path: 'service_id'
        }
    }
    ]);
    res.status(200).json({
        success: true,
        ratings
    })
}

exports.getSingleRating = async (req, res, next) => {
    const rating = await Rating.findById(req.params.id)
        .populate([{
            path: 'inquiry_id',

            populate: { path: 'customer' }
        },
        {
            path: 'inquiry_id',
            model: 'Inquiry',
            populate: {
                path: 'freelancer',
                model: 'Freelancer',
                populate: {
                    path: 'user_id',
                    model: 'user'
                }
            }
        }
        ]);

    if (!rating) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        rating
    })
}

exports.getMyServiceRatings = async (req, res, next) => {
    console.log(req.body.service_id);

    try {
        const ratings = await Rating.find({ service_id: req.body.service_id }).populate('user');
        res.status(200).json({
            success: true,
            ratings
        });
    } catch (error) {
        return next(new ErrorHandler('Service not found', 404));
    }
};






