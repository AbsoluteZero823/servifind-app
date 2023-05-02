const { reset } = require('nodemon');
const Inquiry = require('../models/inquiry');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Category = require('../models/category');
//create new service

exports.newInquiry = async (req, res, next) => {


    const inquiry = await Inquiry.create(req.body);
    req.body.customer = req.user.id;
    res.status(201).json({
        success: true,
        inquiry
    })
}

//get all inquiries
exports.getInquiries = async (req, res, next) => {


    const inquiries = await Inquiry.find().populate(['customer', {
        path: 'service_id',

        populate: { path: 'user' }
    }, {
            path: 'service_id',
            populate: { path: 'category' }
        },
        {
            path: 'freelancer',
            populate: { path: 'user_id' }
        }
    ]);
    res.status(200).json({
        success: true,
        inquiries
    })
}


// get My (AS A CLIENT) inquiries
exports.getMyInquiries = async (req, res, next) => {


    const user = await User.findById(req.user.id);

    const inquiries = await Inquiry.find({ customer: user._id }).populate(['customer', {
        path: 'service_id',

        populate: { path: 'user freelancer_id' }
    }, {
            path: 'service_id',
            populate: { path: 'category' }
        }]);


    res.status(200).json({
        success: true,
        inquiries

    })
}

// //get Client inquiries
// exports.getClientInquiries = async (req, res, next) => {


//     const user = await User.findById(req.user.id);

//     const inquiries = await Inquiry.find().populate(['customer', {
//         path: 'service_id',

//         populate: { path: 'user' }
//     }, {
//             path: 'service_id',
//             populate: { path: 'category' }
//         },
//         {
//             path: 'freelancer',
//             populate: { path: 'user_id' }
//         }
//     ]);


//     res.status(200).json({
//         success: true,
//         inquiries

//     })
// }

//get MY (AS A FREELANCER) inquiries auto filtered to fetch pending inquiries
exports.getClientInquiries = async (req, res, next) => {

    try {
        const inquiries = await Inquiry.find({ freelancer: req.body.freelancer })
            .where('status').equals('pending')
            .populate('customer')
            .populate({
                path: 'service_id',
                populate: { path: 'category freelancer_id' }
            });
        res.status(200).json({
            success: true,
            inquiries
        });
    } catch (error) {
        next(error);
    }
};

exports.getSingleInquiry = async (req, res, next) => {
    const inquiry = await Inquiry.findById(req.params.id)
        .populate(['customer', {
            path: 'service_id',
            populate: { path: 'user' }
        }, {
                path: 'service_id',
                populate: { path: 'category' }
            }]);


    if (!inquiry) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        inquiry
    })
}

// router.delete(`/:id`, (req, res) => {
//     Inquiry.findByIdAndRemove(req.params.id).then(inquiry => {
//         if (inquiry) {
//             return res.status(200).json({ success: true, message: 'the inquiry is deleted' })

//         } else {
//             return res.status(404).json({ success: false, message: "inquiry not found!" })
//         }
//     }).catch(err => {
//         return res.status(400).json({ success: false, error: err })
//     })
// })
//End Delete

exports.deleteInquiry = async (req, res, next) => {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    await inquiry.remove();
    res.status(200).json({
        success: true,
        message: 'Inquiry cancelled'
    })
}


exports.updateStatus = async (req, res, next) => {
    console.log(req.body);
    const statusData = {
        status: req.body.status,

    }



    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, statusData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}


