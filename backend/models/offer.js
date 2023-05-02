const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    created_At: {
        type: Date,
        required: true,
        default: Date.now
    },
    offer_status: {
        type: String,
        required: true,
        default: 'waiting'
        // waiting, cancelled, granted
    },
    offered_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    request_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required: false
    },
    inquiry_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inquiry',
        required: false
    },
})

module.exports = mongoose.model('Offer', offerSchema);