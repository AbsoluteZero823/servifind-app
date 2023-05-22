const { reset } = require('nodemon');
const Report = require('../models/report');
const User = require('../models/user');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
// const  Category  = require('../models/category');

exports.newReport = async (req, res, next) => {
    console.log(req.body);
    // req.body.user = req.user.id;
    const report = await Report.create(req.body);

    res.status(201).json({
        success: true,
        report
    })
}

//all Reports
exports.getUserWithReports = async (req, res, next) => {


    const userReported = await Report.find().populate('user_reported').select('user_reported');

    const uniqueUserReported = userReported.reduce((accumulator, report) => {
        const userReportedId = report.user_reported._id.toString();
        if (!accumulator.some(item => item._id.toString() === userReportedId)) {
            accumulator.push(report.user_reported);
        }
        return accumulator;
    }, []);

    console.log(uniqueUserReported);
    const userReportedIds = userReported.map(report => report.user_reported._id);
    const reports = await Report.find({ user_reported: { $in: userReportedIds } });
    // console.log(reports)

    // Merge reports with userReported
    const userWithReports = uniqueUserReported.map(userReported => {
        const userReports = reports.filter(report => report.user_reported.toString() === userReported._id.toString());
        // const reportCount = userReports.reduce((acc, rating) => acc[rating] = (acc[rating] || 0) + 1);
        reportCount = userReports.length

        return {
            ...userReported.toJSON(),
            reports: userReports,
            reportCount
        };
    });




    res.status(200).json({
        success: true,
        reports: userWithReports
    })
}

exports.getUserReports = async (req, res, next) => {
    const reports = await Report.find({ user_reported: req.params.id }).populate('reported_by');



    if (!reports) {
        return next(new ErrorHandler('Report not found', 404));
    }
    res.status(200).json({
        success: true,
        reports
    })
}

exports.getSingleReport = async (req, res, next) => {
    const report = await Report.findById(req.params.id)
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


    if (!report) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        report
    })
}

exports.getmyReports = async (req, res, next) => {
    try {
        const reports = await Report.find({
            $or: [{ reported_by: req.user._id }, { user_reported: req.user._id }]
        }).populate(['user_reported transaction_id reported_by']);
        res.status(200).json({
            success: true,
            reports
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500))
    }
}


