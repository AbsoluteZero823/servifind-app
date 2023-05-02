const { reset } = require('nodemon');
const Offer = require('../models/offer');
const Transaction = require('../models/transaction');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
const mongoose = require("mongoose");
// const  Category  = require('../models/category');

exports.newOffer = async (req, res, next) => {

    req.body.offered_by = req.user._id;
    const offer = await Offer.create(req.body);

    res.status(201).json({
        success: true,
        offer
    })
}

//all Offers
exports.getOffers = async (req, res, next) => {


    // const offers = await Offer.find().populate('offered_by');



    const offers = await Offer.aggregate([
        // {
        //     $match: { status: 'applying' }
        // },
        {
            $lookup: {
                from: "transactions",
                localField: "_id",
                foreignField: "offer_id",
                as: "transaction"
            }
        },
        {
            $sort: {
                "transaction": 1
            }
        }
    ])

    await Offer.populate(offers, { path: "offered_by" });

    res.status(200).json({
        success: true,
        offers
    })
}

exports.getSingleOffer = async (req, res, next) => {


    const singleoffer = await Offer.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.params.id)
            },
        },
        {
            $lookup: {
                from: "transactions",
                localField: "_id",
                foreignField: "offer_id",
                as: "transaction"
            }
        },
        {
            $sort: {
                "transaction": 1
            }
        }
    ]).then(singleoffer => singleoffer[0])

    // const singleoffer = await Offer.findById(req.params.id)
    //     .populate([{
    //         path: 'inquiry_id',

    //         populate: { path: 'customer' }
    //     },
    //     {
    //         path: 'inquiry_id',
    //         model: 'Inquiry',
    //         populate: {
    //             path: 'freelancer',
    //             model: 'Freelancer',
    //             populate: {
    //                 path: 'user_id',
    //                 model: 'user'
    //             }
    //         }
    //     }
    //     ]);


    if (!singleoffer) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        singleoffer
    })
}

exports.updateOffer = async (req, res, next) => {
    let offer = await Offer.findById(req.params.id);

    if (!offer) {
        return next(new ErrorHandler('Offer not found', 404));
    }
    offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,
        offer
    })
}

// exports.getRequestOffers = async (req, res, next) => {
//     const requestoffers = await Offer.find({ request_id: req.params.request_id })
//         .populate(['offered_by', 'request_id', { path: 'service_id', populate: ['freelancer_id'] }]);


//     if (!requestoffers) {
//         return next(new ErrorHandler('Request not found', 404));
//     }
//     res.status(200).json({
//         success: true,
//         requestoffers
//     })
// }

exports.getRequestOffers = async (req, res, next) => {
    const requestoffers = await Offer.find({ request_id: req.params.request_id })


        .populate(['offered_by', 'request_id', { path: 'service_id', populate: ['freelancer_id'] }]);

    if (!requestoffers) {

        return next(new ErrorHandler('Request not found', 404));
    }

    const offerIds = requestoffers.map(offer => offer._id); // Extract offer IDs

    const transactions = await Transaction.find({ offer_id: { $in: offerIds } });

    const offersWithTransactions = requestoffers.map(offer => {
        const offerTransactions = transactions.filter(transaction => transaction.offer_id.toString() === offer._id.toString());
        return { ...offer.toObject(), transactions: offerTransactions };
    });

    res.status(200).json({
        success: true,
        requestoffers: offersWithTransactions
    });
}

exports.cancelOtherOffer = async (req, res, next) => {
    // console.log(req.params);
    // if(request._id ===){

    // }
    // const offerData = {
    //     offer_status: 'accepted',

    // }
    const requestId = req.params.id;

    const offer = await Offer.updateMany({ $and: [{ "request_id": requestId }, { "_id": { $ne: req.params.offer_id } }] }, { $set: { offer_status: 'cancelled' } })

    // const offer = await Offer.findByIdAndUpdate(req.params.id, offerData, {
    //     new: true,
    //     runValidators: true,
    //     // useFindandModify:false
    // })
    res.status(200).json({
        success: true,

    })


}


exports.acceptOffer = async (req, res, next) => {
    console.log(req.params);


    const offer = await Offer.findByIdAndUpdate(req.params.id, { offer_status: 'granted' }, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}

exports.getmyOffers = async (req, res, next) => {
    const myoffers = await Offer.find({ offered_by: req.user._id }).populate(['offered_by', { path: 'request_id', populate: 'requested_by' }, { path: 'service_id', populate: 'category' }, { path: 'inquiry_id', populate: 'customer' }]);

    if (!myoffers) {
        return next(new ErrorHandler('Offers not found', 404));
    }

    const offerIds = myoffers.map(offer => offer._id); // Extract offer IDs

    const transactions = await Transaction.find({ offer_id: { $in: offerIds } });

    const offersWithTransactions = myoffers.map(offer => {
        const offerTransactions = transactions.filter(transaction => transaction.offer_id.toString() === offer._id.toString());
        return { ...offer.toObject(), transactions: offerTransactions };
    });

    res.status(200).json({
        success: true,

        myoffers: offersWithTransactions
    })
}
