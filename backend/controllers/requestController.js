const { reset } = require('nodemon');
const Request = require('../models/request');
const Category = require('../models/category');
const Offer = require('../models/offer');
const Transaction = require('../models/transaction');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
// const  Category  = require('../models/category');


exports.newRequest = async (req, res, next) => {
    req.body.requested_by = req.user._id;
    const request = await Request.create(req.body);

    res.status(201).json({
        success: true,
        request
    })
}

//all Requests
exports.getRequests = async (req, res, next) => {
    // const servicesCount = await Service.countDocuments();
    // const sort = { _id: -1 };
    // .sort(sort)
    const apiFeatures = new APIFeatures(Request.find().populate(['requested_by', 'category']), req.query).filter();

    const requests = await apiFeatures.query;
    // const requests = await Request.find().populate(['requested_by', 'category']);

    res.status(200).json({
        success: true,
        requests
    })
}

exports.getSingleRequest = async (req, res, next) => {
    const singlerequest = await Request.findById(req.params.id);
    // .populate([{
    //     path: 'inquiry_id',

    //     populate: { path: 'customer' }
    // },
    // {
    //     path: 'inquiry_id',
    //     model: 'Inquiry',
    //     populate: {
    //         path: 'freelancer',
    //         model: 'Freelancer',
    //         populate: {
    //             path: 'user_id',
    //             model: 'user'
    //         }
    //     }
    // }
    // ]);


    if (!singlerequest) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        singlerequest
    })
}

//MOBILE CODES
exports.getAllexceptMyRequest = async (req, res, next) => {
    try {
        const requests = await Request.find({
            requested_by: { $ne: req.user.id }
        }).populate('category').populate('requested_by');
        res.status(200).json({ requests: requests, success: true });
    } catch (error) {
        next(error);
    }
}

exports.getMyRequest = async (req, res, next) => {
    try {
        const request = await Request.findById(req.params.id)
            .populate('category')
            .populate('requested_by');

        res.status(200).json({
            success: true,
            request
        });
    } catch (err) {
        next(err);
    }
}


exports.getMyRequests = async (req, res, next) => {
    const requests = await Request.find({ requested_by: req.user.id }).populate('requested_by category');
    if (requests) {
        res.status(200).json({
            success: true,
            requests
        })
    } else {
        return next(new ErrorHandler('Server Error', 400));
    }

}

exports.editMyRequest = async (req, res, next) => {
    const requests = await Request.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    if (requests) {
        res.status(200).json({
            success: true,
            requests
        })
    } else {
        return next(new ErrorHandler('Server Error', 400));
    }
}

exports.deleteMyRequest = async (req, res, next) => {
    try {
        // Update the request status to cancelled
        const deletedRequest = await Request.findByIdAndUpdate(req.params.id, {
            request_status: 'cancelled'
        });

        if (!deletedRequest) {
            return next(new ErrorHandler('Request not found', 404));
        }

        // Update all offers associated with the request to cancelled
        const deletedOffers = await Offer.updateMany(
            { request_id: req.params.id },
            { offer_status: 'cancelled' }
        );

        res.status(200).json({
            success: true,
            message: 'Request and all offers associated with it have been cancelled'
        });
    } catch (error) {
        return next(new ErrorHandler('Server Error', 500));
    }
};

exports.refuseanOffer = async (req, res, next) => {
    const { offer_id, inquiry_id } = req.body;
    try {
        if (inquiry_id) {
            // Update offer status
            const offer = await Offer.findOneAndUpdate(
                { inquiry_id: inquiry_id },
                { offer_status: 'cancelled' },
                { new: true }
            );
            if (!offer) {
                return res.status(404).json({ success: false, message: 'Offer not found' });
            }
            // Update transaction status
            const transaction = await Transaction.findOneAndUpdate(
                { offer_id: offer._id },
                { status: 'cancelled' },
                { new: true }
            );
            if (!transaction) {
                return res.status(404).json({ success: false, message: 'Transaction not found' });
            }
        } else {
            // Update offer status
            const offer = await Offer.findOneAndUpdate(
                { _id: offer_id },
                { offer_status: 'cancelled' },
                { new: true }
            );
            if (!offer) {
                return res.status(404).json({ success: false, message: 'Offer not found' });
            }
        }
        res.status(200).json({ success: true, message: 'Offer Refused!' });
    } catch (error) {
        return next(error);
    }
};

exports.refuseanOffer = async (req, res, next) => {
    const { offer_id, inquiry_id } = req.body;
    try {
        if (inquiry_id) {
            // Update offer status
            const offer = await Offer.findOneAndUpdate(
                { inquiry_id: inquiry_id },
                { offer_status: 'cancelled' },
                { new: true }
            );
            if (!offer) {
                return res.status(404).json({ success: false, message: 'Offer not found' });
            }
            // Update transaction status
            const transaction = await Transaction.findOneAndUpdate(
                { offer_id: offer._id },
                { status: 'cancelled' },
                { new: true }
            );
            if (!transaction) {
                return res.status(404).json({ success: false, message: 'Transaction not found' });
            }
        } else {
            // Update offer status
            const offer = await Offer.findOneAndUpdate(
                { _id: offer_id },
                { offer_status: 'cancelled' },
                { new: true }
            );
            if (!offer) {
                return res.status(404).json({ success: false, message: 'Offer not found' });
            }
        }
        res.status(200).json({ success: true, message: 'Offer Refused!' });
    } catch (error) {
        return next(error);
    }
};

exports.refuseaPrice = async (req, res, next) => {
    const { offer_id, inquiry_id } = req.body;
    try {
        if (inquiry_id) {
            // Update offer status
            const offer = await Offer.findOneAndUpdate(
                { inquiry_id: inquiry_id },
                { offer_status: 'cancelled' },
            );
            if (!offer) {
                return res.status(404).json({ success: false, message: 'Offer not found' });
            }
        } else {
            // Update transaction status
            const transaction = await Transaction.findOneAndUpdate(
                { offer_id: offer_id },
                { status: 'cancelled' },
                { new: true }
            );
            if (!transaction) {
                return res.status(404).json({ success: false, message: 'Transaction not found' });
            }
        }
        res.status(200).json({ success: true, message: 'Price Refused!' });
    } catch (error) {
        return next(error);
    }
};

exports.acceptanOffer = async (req, res, next) => {
    const { offer_id, inquiry_id } = req.body;
    console.log(req.body);
    try {
        if (inquiry_id) {
            // Update offer status
            const offer = await Offer.findOneAndUpdate(
                { inquiry_id: inquiry_id },
                { offer_status: 'granted' },
                { new: true }
            );
            if (!offer) {
                return res.status(404).json({ success: false, message: 'Offer not found' });
            }
            // Do not update transaction status as offer is accepted
        } else if (offer_id) {
            // Update offer status
            const offer = await Offer.findOneAndUpdate(
                { _id: offer_id },
                { offer_status: 'granted' },
                { new: true }
            );
            if (!offer) {
                return res.status(404).json({ success: false, message: 'Offer not found' });
            }
            // Update request status
            const request = await Request.findOneAndUpdate(
                { _id: offer.request_id },
                { request_status: 'granted' },
                { new: true }
            );
            if (!request) {
                return res.status(404).json({ success: false, message: 'Request not found' });
            }
        } else {
            return res.status(400).json({ success: false, message: 'Missing offer_id or inquiry_id' });
        }
        res.status(200).json({
            success: true,
            message: 'Offer Accepted!',
        });
    } catch (err) {
        next(err);
    }
};

