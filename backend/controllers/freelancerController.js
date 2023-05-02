const { reset } = require('nodemon');
const Freelancer = require('../models/freelancer');
const User = require('../models/user');
const Service = require('../models/service');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');

// const  Category  = require('../models/category');

exports.newFreelancer = async (req, res, next) => {
    // console.log(req.body.resume);
    req.body.user = req.user._id;


    const resultResume = await cloudinary.v2.uploader.upload(req.body.resume, {
        folder: 'servifind/freelancer/resume',
        // width: 150,
        // crop: "scale"
    })
    const resultSchoolID = await cloudinary.v2.uploader.upload(req.body.schoolID, {
        folder: 'servifind/freelancer/schoolID',
        // width: 150,
        // crop: "scale"
    })


    // req.body.user = req.user.id;
    // const freelancer = await Freelancer.create(req.body);
    const freelancer = await Freelancer.create({
        user_id: req.body.user,
        course: req.body.course,
        resume: {
            public_id: resultResume.public_id,
            url: resultResume.secure_url
        },
        schoolID: {
            public_id: resultSchoolID.public_id,
            url: resultSchoolID.secure_url
        },

    })

    res.status(201).json({
        success: true,
        freelancer

    })






}

// all Freelancers
exports.getFreelancers = async (req, res, next) => {


    const freelancers = await Freelancer.find()

    res.status(200).json({
        success: true,
        freelancers
    })
}

// const inquiries = await Inquiry.find({ freelancer: user._id }).populate(['customer', {
//     path: 'service_id',

//     populate: { path: 'user' }
// }, {
//         path: 'service_id',
//         populate: { path: 'category' }
//     }]);


// exports.getSingleFreelancer = async (req, res, next) => {
//     const freelancer = await Freelancer.findById(req.params.id)
//         .populate('user_id');


//     if (!freelancer) {
//         return next(new ErrorHandler('Freelancer not found', 404));
//     }
//     res.status(200).json({
//         success: true,
//         freelancer
//     })
// }

exports.getSingleFreelancer = async (req, res, next) => {
    try {
        const freelancer = await Freelancer.findById(req.params.id).populate('user_id');

        if (!freelancer) {

            return next(new ErrorHandler('Freelancer not found', 404));
        }

        // Fetch all services related to the freelancer using the freelancer's _id
        const services = await Service.find({ freelancer_id: freelancer._id }).populate('category');

        res.status(200).json({

            success: true,
            freelancer,
            services
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
};

exports.getApplicationEntries = async (req, res, next) => {


    const applyingfreelancers = await Freelancer.aggregate([
        {
            $match: { status: 'applying' }
        },
        {
            $lookup: {
                from: "services",
                localField: "_id",
                foreignField: "freelancer_id",
                as: "firstService"
            }
        },
        {
            $sort: {
                "firstService": 1
            }
        }
    ])


    await Freelancer.populate(applyingfreelancers, { path: "user_id" });


    res.status(200).json({
        success: true,
        applyingfreelancers
    })



}


exports.approveApplication = async (req, res, next) => {
    let freelancer = await Freelancer.findById(req.params.id);

    const freelancerData = {
        status: "approved",
        approved_date: Date.now()
    }
    const userData = {
        role: 'freelancer',

        freelancer_id: freelancer._id
    }
    if (!freelancer) {
        return next(new ErrorHandler('User not found', 404));
    }


    freelancer = await Freelancer.findByIdAndUpdate(req.params.id, freelancerData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    const user = await User.findByIdAndUpdate(freelancer.user_id, userData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        isUpdated: true,
        freelancer,
        user
    })
}
exports.rejectApplication = async (req, res, next) => {
    let freelancer = await Freelancer.findById(req.params.id);
    const freelancerData = {
        status: "rejected"
    }



    if (!freelancer) {
        return next(new ErrorHandler('User  not found', 404));
    }
    freelancer = await Freelancer.findByIdAndUpdate(req.params.id, freelancerData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        isUpdated: true,
        freelancer
    })
}

exports.availPremium = async (req, res, next) => {
    let freelancer = await Freelancer.findById(req.user.freelancer_id._id);
    // console.log(req.user.freelancer._id);
    const result = await cloudinary.v2.uploader.upload(req.body.premiumReceipt, {
        folder: 'servifind/freelancer/receipt',
        // width: 150,
        // crop: "scale"
    })

    const freelancerData = {
        premiumReceipt: {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    // const freelancerData = {
    //     premiumReceipt: {
    //         public_id: 'result.public_id',
    //         url: 'result.secure_url'
    //     }
    // }

    if (!freelancer) {
        return next(new ErrorHandler('User  not found', 404));
    }
    freelancer = await Freelancer.findByIdAndUpdate(req.user.freelancer_id._id, freelancerData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        isUpdated: true,
        freelancer
    })
}


exports.getApplicationPremium = async (req, res, next) => {

    const applyingfreelancers = await Freelancer.find({ premiumReceipt: { $exists: true }, isPremium: 'false', 'premiumReceipt.rejectReason': { $exists: false } }).populate('user_id')

    res.status(200).json({
        success: true,
        applyingfreelancers
    })

}


exports.approveApplicationPremium = async (req, res, next) => {
    let freelancer = await Freelancer.findById(req.params.id);

    const freelancerData = {
        isPremium: true,

    }

    freelancerData.premiumReceipt = {
        public_id: freelancer.premiumReceipt.public_id,
        url: freelancer.premiumReceipt.url,
        isPaymentReceived: true,

    }

    if (!freelancer) {
        return next(new ErrorHandler('User not found', 404));
    }


    freelancer = await Freelancer.findByIdAndUpdate(req.params.id, freelancerData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })

    res.status(200).json({
        isUpdated: true,
        freelancer

    })
}
exports.rejectApplicationPremium = async (req, res, next) => {
    let freelancer = await Freelancer.findById(req.params.id);
    const freelancerData = {
        isPremium: false,
    }
    freelancerData.premiumReceipt = {
        public_id: freelancer.premiumReceipt.public_id,
        url: freelancer.premiumReceipt.url,
        isPaymentReceived: false,
        rejectReason: req.body.rejectReason
    }


    if (!freelancer) {
        return next(new ErrorHandler('User  not found', 404));
    }
    freelancer = await Freelancer.findByIdAndUpdate(req.params.id, freelancerData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        isUpdated: true,
        freelancer
    })
}

exports.availabiltyUpdate = async (req, res, next) => {
    try {
        let freelancer = await Freelancer.findById(req.user.freelancer_id._id);
        let freelancerData = {

        }
        if (req.user.freelancer_id.availability === 'true') {
            freelancerData = {
                availability: 'false'
            }
        } else {
            freelancerData = {
                availability: 'true'
            }
        }




        if (!freelancer) {
            return next(new ErrorHandler('User  not found', 404));
        }
        freelancer = await Freelancer.findByIdAndUpdate(req.user.freelancer_id._id, freelancerData, {
            new: true,
            runValidators: true,
            // useFindandModify:false
        })
        res.status(200).json({
            isUpdated: true,
            freelancer
        })
    } catch (error) {
        console.log(error)
    }

}


exports.completeFreelancerSetup = async (req, res, next) => {
    try {
        let freelancer = await Freelancer.findById(req.user.freelancer_id._id);

        const result = await cloudinary.v2.uploader.upload(req.body.qrCode, {
            folder: 'servifind/freelancer/qrcode',
            // width: 150,
            // crop: "scale"
        })

        const freelancerData = {
            gcash_name: req.body.gcash_name,
            gcash_num: req.body.gcash_num,
            qrCode: {
                public_id: result.public_id,
                url: result.secure_url

            }
        }








        if (!freelancer) {
            return next(new ErrorHandler('User  not found', 404));
        }
        freelancer = await Freelancer.findByIdAndUpdate(req.user.freelancer_id._id, freelancerData, {
            new: true,
            runValidators: true,
            // useFindandModify:false
        })
        res.status(200).json({
            isUpdated: true,
            freelancer
        })
    } catch (error) {
        console.log(error)
    }

}

// CODES SA MOBILE
exports.makemeaFreelancer = async (req, res, next) => {
    try {
        const existingFreelancer = await Freelancer.findOne({ user_id: req.user.id });
        if (existingFreelancer) {
            return next(new ErrorHandler('You already have a freelancer document registered, Wait for Administrator Verification', 400));
        }

        const qrResult = await cloudinary.v2.uploader.upload(req.body.qrCode, {
            folder: 'servifind/freelancer/documents',
            width: 300,
            crop: "scale"
        });
        const schoolIdResult = await cloudinary.v2.uploader.upload(req.body.schoolID, {
            folder: 'servifind/freelancer/documents',
            width: 300,
            crop: "scale"
        });
        const resumeresult = await cloudinary.v2.uploader.upload(req.body.resume, {
            folder: 'servifind/freelancer/documents',
            width: 300,
            crop: "scale"
        });

        const freelancer = new Freelancer({
            status: 'applying',
            user_id: req.body.user_id || req.user.id,
            gcash_name: req.body.gcash_name,
            gcash_num: req.body.gcash_number,
            course: req.body.course,
            qrCode: {
                public_id: qrResult.public_id,
                url: qrResult.secure_url
            },
            schoolId: {
                public_id: schoolIdResult.public_id,
                url: schoolIdResult.secure_url
            },
            resume: {
                public_id: resumeresult.public_id,
                url: resumeresult.secure_url
            }
        });
        const result = await freelancer.save();
        res.status(201).json({
            message: 'Application Sent, Wait for Confirmation',
            freelancer: result,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getmyFreelancers = async (req, res, next) => {
    try {
        const freelancer = await Freelancer.find({ user_id: req.user.id });
        res.status(200).json({
            success: true,
            freelancer
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

exports.updatemyFreelancers = async (req, res, next) => {
    try {
        const freelancer = await Freelancer.findOneAndUpdate({ user_id: req.user.id }, req.body, { new: true });
        res.status(200).json({
            message: "Freelancer Updated Successfully",
            freelancer: freelancer,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

exports.upgrademyFreelancer = async (req, res, next) => {
    try {
        const receiptresult = await cloudinary.v2.uploader.upload(req.body.receipt, {
            folder: 'servifind/freelancer/documents',
            width: 300,
            crop: "scale"
        });
        req.body.premiumreceipt = {
            public_id: receiptresult.public_id,
            url: receiptresult.secure_url
        };
        const freelancer = await Freelancer.findOneAndUpdate({ user_id: req.user.id }, req.body, { new: true });
        console.log(freelancer);
        res.status(200).json({
            message: "Applied for Premium",
            freelancer: freelancer,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}
