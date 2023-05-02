const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reason: {
        type: String,
        required: true
    },
    description: {
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
    reported_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    user_reported: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    transaction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    }
})

module.exports = mongoose.model('Report', reportSchema);