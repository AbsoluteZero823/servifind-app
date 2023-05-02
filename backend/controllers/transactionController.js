const { reset } = require('nodemon');
const Transaction = require('../models/transaction');
const cloudinary = require('cloudinary');
const Request = require('../models/request');
const Offer = require('../models/offer');
const Inquiry = require('../models/inquiry');
const Rating = require('../models/rating');
const Report = require('../models/report');

const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
// const  Category  = require('../models/category');

exports.newTransaction = async (req, res, next) => {
    console.log(req.body);
    // req.body.user = req.user.id;
    const transaction = await Transaction.create(req.body);

    res.status(201).json({
        success: true,
        transaction
    })
}

//all Transactions
exports.getTransactions = async (req, res, next) => {

    const sort = { _id: -1 };
    const transactions = await Transaction.find().sort(sort).populate([{
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
    },
    {
        path: 'offer_id',
        model: 'Offer',
        populate: {
            path: 'request_id',
            model: 'Request',
            populate: {
                path: 'requested_by',
                model: 'user'
            }
        }
    },
    {
        path: 'offer_id',
        model: 'Offer',
        populate: {
            path: 'offered_by',

        }
    }
    ]);
    res.status(200).json({
        success: true,
        transactions
    })
}

exports.getSingleTransaction = async (req, res, next) => {
    const transaction = await Transaction.findById(req.params.id)
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
        },
        {
            path: 'offer_id',
            model: 'Offer',
            populate: {
                path: 'service_id',
                model: 'Service',
                populate: {
                    path: 'freelancer_id',
                    model: 'Freelancer',
                    populate: {
                        path: 'user_id',
                        model: 'user',
                    }
                },

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


    if (!transaction) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        transaction
    })
}

exports.PaymentSent = async (req, res, next) => {
    console.log(req.body);
    const statusData = {
        paymentSent: req.body.paymentSent,

    }



    const transaction = await Transaction.findByIdAndUpdate(req.params.id, statusData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}
exports.PaymentReceived = async (req, res, next) => {
    console.log(req.body);
    const statusData = {
        paymentReceived: req.body.paymentReceived,

    }



    const transaction = await Transaction.findByIdAndUpdate(req.params.id, statusData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}

exports.transactionDone = async (req, res, next) => {
    console.log(req.body);


    if (req.body.freelancer === 'true' && req.body.client === 'true') {
        formData = {

            status: 'completed'

        }
        formData.transaction_done = {
            client: req.body.client,
            freelancer: req.body.freelancer,
            workCompleted: req.body.workCompleted,
            transactionCompleted: now()
        }
    } else if (req.body.freelancer === 'true' && req.body.client === 'false') {
        formData = {



        }
        formData.transaction_done = {
            client: req.body.client,
            freelancer: req.body.freelancer,
            workCompleted: now()

        }
    } else {
        formData = {



        }

        formData.transaction_done = {
            client: req.body.client,
            freelancer: req.body.freelancer,

        }
    }
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, formData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}

exports.rateDone = async (req, res, next) => {
    // console.log(req.body);
    const isRatedData = {
        isRated: 'true',

    }

    const transaction = await Transaction.findByIdAndUpdate(req.params.id, isRatedData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}

exports.reportDone = async (req, res, next) => {
    // console.log(req.body);

    formData = {



    }
    formData.reportedBy = {
        client: req.body.client,
        freelancer: req.body.freelancer,
    }


    const transaction = await Transaction.findByIdAndUpdate(req.params.id, formData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}


exports.updateTransaction = async (req, res, next) => {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        return next(new ErrorHandler('Transaction not found', 404));
    }
    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,
        transaction
    })
}


// CODES SA MOBILE BALIKAN PARA SA ROUTES
exports.ClientFetchTransaction = async (req, res, next) => {
    try {
        // Get all the user's requests
        const requests = await Request.find({ requested_by: req.user._id })
        const requestIds = requests.map((request) => request._id)

        // Get all the offers associated with those requests
        const offers = await Offer.find({ request_id: { $in: requestIds } }).populate('service_id')

        // Get all the transactions associated with those offers
        const transactions = await Transaction.find({ offer_id: { $in: offers.map((offer) => offer._id) } }).populate({
            path: "offer_id",
            populate: {
                path: "offered_by service_id",
            },
        })
        // Return the transactions
        res.status(200).json({
            success: true,
            transactions,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}


exports.ClientCompleteTransaction = async (req, res, next) => {
    if (req.body.gcashreceipt) {
        const result = await cloudinary.v2.uploader.upload(req.body.gcashreceipt, {
            folder: 'servifind/gcashreceipts',
            width: 150,
            crop: "scale"
        })
        req.body.gcashreceipt = result.secure_url;
    }
    req.body.isPaid = true;
    req.body.paymentSent = true;
    req.body.created_at = new Date();
    req.body.transaction_done = { client: true };

    const transactionexist = await Transaction.findOneAndUpdate({
        offer_id: req.body.offer_id,
    },
        req.body,
        {
            new: true
        }
    )

    if (transactionexist) {
        return res.status(200).json({ success: true, message: 'Transaction Completed!' });
    } else {
        const transaction = await Transaction.create(req.body);
        res.status(201).json({
            success: true,
            transaction
        })
    }


}

exports.ClientRateTransaction = async (req, res, next) => {
    const { rating, comment, service_id, transaction_id } = req.body;
    try {
        // Update the Transaction with the given transaction_id to set isRated to true
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            transaction_id,
            { isRated: 'true' },
            { new: true }
        );
        // Create a new Rating data with the given rating, comment, service_id, and transaction_id
        const newRating = new Rating({
            rating,
            comment,
            user: req.user._id, // assuming you have a logged-in user
            service_id,
            transaction_id,
        });
        const savedRating = await newRating.save();
        return res.status(200).json({ success: true, message: 'Freelancer Rating added successfully!' });
    } catch (error) {
        return next(error);
    }
};

exports.ClientReportTransaction = async (req, res, next) => {
    const { reason, description, user_reported, _id } = req.body;
    try {
        // Update the Transaction with the given transaction_id to set reportedBy.client to true
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            _id,
            { 'reportedBy.client': 'true' },
            { new: true }
        );
        // Create a new Report data with the given reason, description, user_reported, and transaction_id
        const newReport = new Report({
            reason,
            description,
            reported_by: req.user._id, // assuming you have a logged-in user
            user_reported,
            transaction_id: _id,
        });
        const savedReport = await newReport.save();
        return res.status(200).json({ success: true, message: 'Freelancer Report added successfully!' });
    } catch (error) {
        return next(error);
    }
};

exports.FreelancerFetchTransaction = async (req, res, next) => {
    try {
        // Get all the offers associated with the user
        const offers = await Offer.find({ offered_by: req.user._id });
        // Get all the transactions associated with those offers
        const transactions = await Transaction.find({ offer_id: { $in: offers.map((offer) => offer._id) } }).populate({
            path: "offer_id",
            populate: [
                { path: "service_id" },
                { path: "request_id", populate: { path: "requested_by" } },
                { path: "inquiry_id", populate: { path: "customer" } }
            ],
        })
        // Return the transactions
        res.status(200).json({
            success: true,
            transactions,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

exports.FreelancerGenerateTransaction = async (req, res, next) => {
    req.body.created_at = new Date();

    const transactionexist = await Transaction.findOneAndUpdate({
        offer_id: req.body.offer_id,
    },
        req.body,
        {
            new: true
        })

    if (transactionexist) {
        console.log(transactionexist);
        return res.status(200).json({ success: true, message: 'Transaction Completed!' });
    }

    const transaction = await Transaction.create(req.body);
    res.status(201).json({
        success: true,
        transaction
    })
}

exports.FreelancerCompleteTransaction = async (req, res, next) => {
    const params = {};
    params.isPaid = 'true';
    params.paymentSent = 'true';
    params.paymentReceived = 'true';
    params.transaction_done = { client: 'true', freelancer: 'true', workCompleted: new Date(), transactionCompleted: new Date() };
    params.finished_At = new Date();
    params.status = 'completed';
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.body._id,
            params,
            { new: true }
        );
        return res.status(200).json({ success: true, message: 'Transaction Completed!' });
    } catch (error) {
        return next(error);
    }
}

exports.FreelancerReportTransaction = async (req, res, next) => {
    const { reason, description, user_reported, _id } = req.body;
    try {
        // Update the Transaction with the given transaction_id to set reportedBy.client to true
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            _id,
            { 'reportedBy.freelancer': 'true' },
            { new: true }
        );
        // Create a new Report data with the given reason, description, user_reported, and transaction_id
        const newReport = new Report({
            reason,
            description,
            reported_by: req.user._id, // assuming you have a logged-in user
            user_reported,
            transaction_id: _id,
        });
        const savedReport = await newReport.save();
        return res.status(200).json({ success: true, message: 'Report Sent!' });
    } catch (error) {
        return next(error);
    }
}

exports.FetchTransactionbyOfferorInquiry = async (req, res, next) => {
    const { offer_id, inquiry_id } = req.body;
    try {
        let query = {};
        if (offer_id !== null && offer_id !== undefined) {
            query.offer_id = offer_id;
        }
        if (inquiry_id !== null && inquiry_id !== undefined) {
            query.inquiry_id = inquiry_id;
        }
        const transaction = await Transaction.findOne(query).populate('offer_id');
        if (!transaction) {
            return res.status(200).json({ success: false, message: 'No transaction found.' });
        }
        return res.status(200).json({ success: true, transaction });
    } catch (error) {
        return next(error);
    }
}

exports.AddOffertoInquiryByCreatingTransaction = async (req, res, next) => {
    try {
        const { inquiry_id, transactiondetails } = req.body;
        // Check if there is an existing transaction for the offer
        if (transactiondetails) {
            const _id = transactiondetails._id;
            const transaction = await Transaction.findByIdAndUpdate(
                _id,
                { price: req.body.price, status: "processing" },
                { new: true });
            const offer = await Offer.findByIdAndUpdate(
                transactiondetails.offer_id._id,
                {
                    offer_status: 'waiting',
                    description: req.body.description
                }
            )
            return res.status(200).json({
                success: true,
                message: "Transaction updated successfully",
                transaction,
            });
        }

        // Find the Inquiry object with the given inquiry_id and set its status to "granted".
        const inquiry = await Inquiry.findByIdAndUpdate(
            inquiry_id,
            { status: "granted" },
            { new: true }
        );
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        // Create a new Offer object with the required fields.
        const offer = new Offer({
            ...req.body,
            offered_by: req.user._id,
        });

        // Save the new Offer object to the database.
        const savedOffer = await offer.save();

        // Create a new Transaction object with the required fields,
        // including the offer_id of the newly created Offer.
        const transaction = new Transaction({
            offer_id: savedOffer._id,
            ...req.body,
            transaction_status: "processing",
        });

        // Save the new Transaction object to the database.
        const savedTransaction = await transaction.save();
        console.log(savedTransaction);
        return res.status(200).json({
            success: true,
            message: "Offer added to inquiry successfully",
            offer: savedOffer,
            transaction: savedTransaction,
            inquiry: inquiry,
        });
    } catch (error) {
        return next(error);
    }
};