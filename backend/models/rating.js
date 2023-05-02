const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    created_At: {
        type: Date,
        required: true,
        default: Date.now
    },
    // updated_At: {
    //     type: Date,
    //     required: false,
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    transaction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    }
})

module.exports = mongoose.model('Rating', ratingSchema);