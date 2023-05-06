const { reset } = require('nodemon');
const Service = require('../models/service');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Category = require('../models/category');
const Rating = require('../models/rating');
const Freelancer = require('../models/freelancer');
const cloudinary = require('cloudinary')
//create new service
exports.newService = async (req, res, next) => {
    // console.log(req.body)
    try {
        const userId = req.user._id;

        // Check if the user has existing services
        const existingServices = await Service.find({ user: userId });

        if (existingServices.length > 0) {
            // Check if the user is premium
            const freelancer = await Freelancer.findOne({ user_id: userId });
            if (!freelancer.isPremium) {
                return res.status(403).json({
                    success: false,
                    // message: 'You need to be a premium freelancer to create more services'
                });
            }
        }

        const result = await cloudinary.v2.uploader.upload(req.body.images, {
            folder: 'servifind/freelancer/service',
            width: 150,
            height: 150,
            crop: "scale"
        });

        req.body.images = { public_id: result.public_id, url: result.secure_url };
        req.body.user = userId;
        req.body.freelancer_id = req.user.freelancer_id._id
        console.log(req.body);
        const service = await Service.create(req.body);

        res.status(201).json({
            success: true,
            service
        });
    } catch (error) {
        console.log(error);
    }
};


exports.getServices = async (req, res, next) => {
    const servicesCount = await Service.countDocuments();
    const apiFeatures = new APIFeatures(Service.find().populate(['category', 'user', 'freelancer_id']), req.query).search().filter();


    const services = await apiFeatures.query;
    let filteredServicesCount = services.length;

    // Fetch ratings for each service
    const serviceIds = services.map(service => service._id);
    const ratings = await Rating.find({ service_id: { $in: serviceIds } }).populate('user');

    // Merge ratings with services
    const servicesWithRatings = services.map(service => {
        const serviceRatings = ratings.filter(rating => rating.service_id.toString() === service._id.toString());
        const avgRating = serviceRatings.reduce((acc, rating) => acc + rating.rating, 0) / serviceRatings.length;
        return {
            ...service.toJSON(),
            ratings: serviceRatings,
            avgRating
        };
    });

    res.status(200).json({
        success: true,
        servicesCount,
        filteredServicesCount,
        services: servicesWithRatings
    })

}


exports.getSingleService = async (req, res, next) => {
    const ratings = await Rating.find({ service_id: req.params.id }).populate('user');
    const service = await Service.findById(req.params.id).populate(['category', 'user', 'freelancer_id']).then(service => {

        const serviceRatings = ratings.filter(rating => rating.service_id.toString() === service._id.toString());
        const avgRating = serviceRatings.reduce((acc, rating) => acc + rating.rating, 0) / serviceRatings.length;
        const ratingCount = serviceRatings.length;
        return {
            ...service.toJSON(),
            ratings: serviceRatings,
            avgRating,
            ratingCount
        };

    });

    if (!service) {
        return next(new ErrorHandler('Service not found', 404));
    }
    res.status(200).json({
        serviceDetailsSuccess: true,
        service
    })
}

exports.updateService = async (req, res, next) => {
    let service = await Service.findById(req.params.id);

    if (!service) {
        return next(new ErrorHandler('Service not found', 404));
    }
    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,
        service
    })
}

exports.deleteService = async (req, res, next) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        return next(new ErrorHandler('Service not found', 404));
    }
    await service.remove();
    res.status(200).json({
        success: true,
        message: 'Service deleted'
    })
}

exports.getFreelancerServices = async (req, res, next) => {
    console.log(req.params.id)

    const services = await Service.find({ freelancer_id: req.params.id }).populate(['category', 'freelancer_id', 'user']);
    if (!services) {
        return next(new ErrorHandler('Services not found', 404));
    }
    res.status(200).json({
        success: true,
        services
    })

}


exports.getServicesToDisplay = async (req, res, next) => {
    const servicesCount = await Service.countDocuments();
    // const apiFeatures = new APIFeatures(Service.find({ 'freelancer_id.status': 'approved', 'freelancer_id.availability': true }).populate(['category', 'user', 'freelancer_id']), req.query).search().filter();

    const apiFeatures = new APIFeatures(Service.find().populate(['category', 'user', 'freelancer_id']), req.query).search().filter();


    const servicess = await apiFeatures.query;
    const services = servicess.filter(service => service.freelancer_id.availability === true, service => service.freelancer_id.status === 'approved').sort((a, b) => Number(b.freelancer_id.isPremium) - Number(a.freelancer_id.isPremium));
    let filteredServicesCount = services.length;

    // Fetch ratings for each service
    const serviceIds = services.map(service => service._id);
    const ratings = await Rating.find({ service_id: { $in: serviceIds } }).populate('user');

    // Merge ratings with services
    const servicesWithRatings = services.map(service => {
        const serviceRatings = ratings.filter(rating => rating.service_id.toString() === service._id.toString());
        const avgRating = serviceRatings.reduce((acc, rating) => acc + rating.rating, 0) / serviceRatings.length;
        const ratingCount = serviceRatings.length;
        return {
            ...service.toJSON(),
            ratings: serviceRatings,
            avgRating,
            ratingCount
        };
    });

    res.status(200).json({
        success: true,
        servicesCount,
        filteredServicesCount,
        services: servicesWithRatings
    })

}


//CODES SA MOBILE
exports.getmyServices = async (req, res, next) => {
    const services = await Service.find({ user: req.user.id }).populate(['category', 'user', 'freelancer_id']);
    res.status(200).json({

        success: true,
        services
    })
}