const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    priceStarts_At: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    // experience: {
    //     type: String,
    //     required: true
    // },
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelancer',
        required: true
    },
    // status: {
    //     type: String,
    //     default: 'approved'
    // },
    images: {
        public_id: {
            type: String,
            // required: true,
            //    default:'shelter/avatar_rk4v2w'
        },
        url: {
            type: String,
            // required: true,
            //    default:'https://res.cloudinary.com/dawhmjhu1/image/upload/v1651110818/shelter/avatar_rk4v2w.jpg'
        }
    }


})

module.exports = mongoose.model('Service', serviceSchema);