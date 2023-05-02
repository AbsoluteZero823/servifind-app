const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
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
    request_status: {
        type: String,
        required: true,
        default: 'waiting'
        // waiting, cancelled, granted, completed
    },
    requested_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
})

module.exports = mongoose.model('Request', requestSchema);