const { reset } = require('nodemon');
const Notification = require('../models/notification');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
// const { Next } = require('react-bootstrap/esm/PageItem');
// const  Category  = require('../models/category');

exports.newNotification = async (req, res, next) => {
    // console.log(req.body);
    // req.body.user = req.user.id;
    const existingNotification = await Notification.find({type_id: req.body.type_id});
    console.log(existingNotification)
    // if(!existingNotification || existingNotification === null){
    //     console.log("wew")
        try {
         const notification = await Notification.create(req.body);

    res.status(201).json({
        success: true,
        notification
    })
    } catch (error) {
        console.log(error)
    }
    // }
    
   
}

//all Notifications
exports.getNotifications = async (req, res, next) => {


    const notifications = await Notification.find();
    res.status(200).json({
        success: true,
        notifications
    })
}

// exports.getSingleRating = async (req, res, next) => {
//     const rating = await Rating.findById(req.params.id)
//         .populate([{
//             path: 'inquiry_id',

//             populate: { path: 'customer' }
//         },
//         {
//             path: 'inquiry_id',
//             model: 'Inquiry',
//             populate: {
//                 path: 'freelancer',
//                 model: 'Freelancer',
//                 populate: {
//                     path: 'user_id',
//                     model: 'user'
//                 }
//             }
//         }
//         ]);

//     if (!rating) {
//         return next(new ErrorHandler('Inquiry not found', 404));
//     }
//     res.status(200).json({
//         success: true,
//         rating
//     })
// }

exports.getmyNotifications = async (req, res, next) => {
    // console.log(req.user._id);

try {
    const notifications = await Notification.find({user_id: req.user._id, isRead : false}).sort({ created_At: -1 });
    res.status(200).json({
                success: true,
                notifications
            })
} catch (error) {
    return next(new ErrorHandler(error, 401));
}

};

exports.MakeNotificationRead = async (req, res, next) => {
   const formData = {
        isRead: true,
      };
    try {
        let notification = await Notification.findById(req.params.id);

        if (!notification) {
            return next(new ErrorHandler('Notification not found', 404));
        }

        if(notification.type === "message"){
            // notification = await Notification.findByIdAndDelete(req.params.id)
            await notification.remove();
            res.status(200).json({
                success: true,
                
            })
        }
        else{
            notification = await Notification.findByIdAndUpdate(req.params.id, formData, {
                new: true,
                runValidators: true,
                // useFindandModify:false
            })
            res.status(200).json({
                success: true,
                notification
            })
        }
        
    } catch (error) {
        console.log(error)
    }
 
}

exports.ReadAllMyNotif = async (req, res, next) => {
    const userId = req.user._id; // Assuming you have the user's ID
console.log(userId)
    const formData = {
      isRead: true,
    };
    
    const filter = { user_id: userId }; // Define the filter to match the user's notifications
    const update = { $set: formData }; // Use $set to update the 'isRead' field to true
    try{
    // Update all notifications for the given user to mark them as read
    const notifications = await Notification.updateMany(filter, update);
    res.status(200).json({
                success: true,
                notifications
            })
} catch (error) {
    return next(new ErrorHandler(error, 401));
}

};




