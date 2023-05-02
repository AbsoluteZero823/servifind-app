const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    price: {
        type: String,
        required: false
    },
    isPaid: {
        type: String,
        default: 'false',
        required: true
    },
    paymentSent: {
        type: String,
        default: 'false',
        required: true
    },
    paymentReceived: {
        type: String,
        default: 'false',
        required: true
    },
    created_At: {
        type: Date,
        required: true,
        default: Date.now
    },
    expected_Date: {
        type: Date,
        required: true
    },
    finished_At: {
        type: Date,
        required: false
    },
    inquiry_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inquiry',
        required: false
    },
    offer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer',
        required: false
    },
    gcashreceipt: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: 'processing'
    },
    transaction_done: {
        client: {
            type: String,
            required: false,
            default: 'false'
        },
        freelancer: {
            type: String,
            required: false,
            default: 'false'
        },
        workCompleted: {
            type: Date,
            required: false
        },
        transactionCompleted: {
            type: Date,
            required: false
        }
    },
    isRated: {
        type: String,
        required: true,
        default: 'false'
    },
    reportedBy: {
        client: {
            type: String,
            required: false,
            default: 'false'
        },
        freelancer: {
            type: String,
            required: false,
            default: 'false'
        },
    }


})

module.exports = mongoose.model('Transaction', transactionSchema);