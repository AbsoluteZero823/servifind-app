const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: 'applying'
        // "applying", "approved", "restricted", "rejected"
    },
    approved_date: {
        type: Date,
        required: false
    },
    course: {
        type: String,
        required: true,
        default: 'BS - Information Technology'
    },
    isPremium: {
        type: Boolean,
        required: true,
        default: false
    },
    availability: {
        type: Boolean,
        required: true,
        default: 'false'
    },
    gcash_name: {
        type: String,
        required: false,

    },
    gcash_num: {
        type: String,
        required: false
    },
    qrCode: {
        public_id: {
            type: String,
            required: true,
            default: 'servifind/qrcode/default_profile'
        },
        url: {
            type: String,
            required: true,
            default: 'https://res.cloudinary.com/dawhmjhu1/image/upload/v1674014501/servifind/avatar/default_profile.jpg'
        }
    },
    resume: {
        public_id: {
            type: String,
            required: true,
            default: 'servifind/freelancer/resume/emptyResume_i8hkio'
        },
        url: {
            type: String,
            required: true,
            default: 'https://res.cloudinary.com/dawhmjhu1/image/upload/v1681466742/servifind/freelancer/resume/emptyResume_i8hkio.jpg'
        }
    },
    schoolID: {
        public_id: {
            type: String,
            required: true,
            default: 'servifind/freelancer/school_id/schoolID_p9fna0'
        },
        url: {
            type: String,
            required: true,
            default: 'https://res.cloudinary.com/dawhmjhu1/image/upload/v1681466602/servifind/freelancer/school_id/schoolID_p9fna0.jpg'
        }
    },
    premiumReceipt: {
        public_id: {
            type: String,
            required: false,

        },
        url: {
            type: String,
            required: false,

        },
        isPaymentReceived: {
            type: Boolean,
            required: false,
            default: false
        },
        rejectReason: {
            type: String,
            required: false
        }

    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },




})

module.exports = mongoose.model('Freelancer', freelancerSchema);