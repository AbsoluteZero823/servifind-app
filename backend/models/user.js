const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    age: {
        type: Number,
        required: [true, 'Please enter your age'],
        min: [18, 'Your age must be above 18'],
        max: [100, 'Your age must is too old, please check your inputed age'],
        default: 0.0
    },
    gender: {
        type: String,
        required: [true, 'Select your gender'],
        enum: {
            values: ['Male', 'Female'],
            message: 'There is error on proccessing this input'
        }
    },
    contact: {
        type: String,
        required: [true, 'Please enter your contact number'],
        maxLength: [11, 'Your number cannot exceed 11 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },

    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
            default: 'servifind/avatar/default_profile'
        },
        url: {
            type: String,
            required: true,
            default: 'https://res.cloudinary.com/dawhmjhu1/image/upload/v1674014501/servifind/avatar/default_profile.jpg'
        }
    },
    role: {
        type: String,

        default: 'customer'
    },
    status: {
        type: String,
        default: 'activated'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelancer',
        required: false
    },
    emailToken: {
        type: String
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})



// uncomment to test bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
});

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}



module.exports = mongoose.model('user', userSchema);