const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    instruction: {
        type: String,
        required: true
    },
    attachments: {
        type: String,
        required: false
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelancer',
        required: true
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },



})

module.exports = mongoose.model('Inquiry', inquirySchema);