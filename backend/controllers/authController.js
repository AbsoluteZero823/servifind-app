const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const Token = require("../models/token");
const cloudinary = require('cloudinary')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// const createToken = (_id) => {
//     const jwtSecretKey = process.env.JWT_SECRET_KEY;

//     return jwt.sign
// }

exports.registerUser = async (req, res, next) => {
    // const { name, age, gender, contact, email, password, role } = req.body;
    // try {
    //     let useremail = await User.findOne({ email });
    //     if (useremail) res.status(400).json("User already exists...");
    const { name, age, gender, contact, email, password, role } = req.body;



    try {


        // const { error } = validate(req.body);
        // if (error)
        //     return res.status(400).send({ message: error.details[0].message });

        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already exist!" });

        if(req.body.avatar === ''){
         

  user = await User.create({
            name,
            age,
            gender,
            contact,
            email,
            password,
            status: 'activated',
            // role,
         
            
        })

        } else{
            const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: 'servifind/avatar',
                width: 150,
                crop: "scale"
            })

            user = await User.create({
                name,
                age,
                gender,
                contact,
                email,
                password,
                status: 'activated',
                // role,
                avatar: {
                    public_id: result.public_id,
                    url: result.secure_url
                },
                
            }) 
        }
       


      
      

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();

        const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`;

        await sendEmail(user.email, "Verify Email", url, user.name);
        res.status(201).send({
            success: true,
            message: "An Email sent to your account please verify",
            user
        });


    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
        console.log(error)
    }






    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json(error.message);
    // }



    // // const token = user.getJwtToken();


    // sendToken(user, 200, res)
};

exports.verifyEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid Link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) return res.status(400).send({ message: "Invalid Link" });


        await User.updateOne({ _id: user._id }, { $set: { verified: true } })
        await token.remove()

        res.status(200).send({ message: "Email verified successfully" });



    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internals server error" });
    }
}

exports.application = async (req, res, next) => {
    let user = await User.findById(req.params.id);
    const UserData = {
        status: "activated"
    }
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }
    user = await User.findByIdAndUpdate(req.params.id, UserData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,
        user
    })
}

exports.createUser = async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'servifind/avatar',
        width: 150,
        crop: "scale"
    })

    const { name, age, gender, contact, email, role, password } = req.body;
    const user = await User.create({
        name,
        age,
        gender,
        contact,
        email,
        role,
        password,

        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    // const token = user.getJwtToken();

    //  res.status(201).json({
    //  	success:true,
    //  	user,
    //  	token
    //  })
    res.status(201).json({
        success: true,
        user
    })
};


exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;


    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))

    }
    const user = await User.findOne({ email }).select('+password').populate('freelancer_id')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // if (user.status !== 'activated') {
    //     return next(new ErrorHandler('Your account must be active, Please contact support!', 401));
    // }
    if (!user.verified) {
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save();

            const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`;
            await sendEmail(user.email, "Verify Email", url, user.name);
        }
        return res.status(400).send({ messasge: "An Email sent to your account,  please verify" });
    } else {
        sendToken(user, 200, res, { success: true })
        //     const token = user.getJwtToken();
        //  res.status(201).json({
        // 	 	success:true,
        // 	 	token
        // 	 });
    }

}




// Get all users   =>   /api/v1/users
exports.allUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
}
exports.allFreelancers = async (req, res, next) => {
    const users = await User.find({ role: 'freelancer' });

    res.status(200).json({
        success: true,
        users
    })

}
// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    })
}


exports.updateUser = async (req, res, next) => {
    console.log(req.body);
    const newUserData = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        // email: req.body.email,
        // role: req.body.role

    }

    // Update avatar
    if (req.body.avatar !== '') {
        const user = await User.findById(req.params.id)
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: '/servifind/avatar',
            width: 150,
            crop: "scale"
        })




        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}

exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }
    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`
    try {
        await sendEmail({
            email: user.email,
            subject: 'Shelter Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
}

exports.getUserProfile = async (req, res, next) => {
    let user = {}

    if (req.user.role === "freelancer") {
        user = await User.findById(req.user.id).populate('freelancer_id');
    } else {
        user = await User.findById(req.user.id);
    }



    res.status(200).json({
        success: true,
        user

    })
    // try {
    //     const id = req.user.id
    //     const user = await User.aggregate([
    //         {
    //             $match: {
    //                 _id: ObjectId(id)
    //             },

    //         },

    //         {
    //             $lookup: {
    //                 from: "freelancers",
    //                 localField: "_id",
    //                 foreignField: "user_id",
    //                 as: "freelancer"
    //             }
    //         },
    //         {
    //             $sort: {
    //                 "freelancer": 1
    //             }
    //         }
    //     ]).then(user => user[0]);



    //         res.status(200).json({
    //             success: true,
    //             user

    //         })



    // } catch (error) {
    //     console.log(error)
    // }
}

// Update / Change password   =>  /api/v1/password/update
// exports.updatePassword = async (req, res, next) => {
//     const user = await User.findById(req.user.id).select('password');
//     // Check previous user password
//     const isMatched = await user.comparePassword(req.body.oldPassword)
//     if (!isMatched) {
//         return next(new ErrorHandler('Old password is incorrect'));
//     }
//     user.password = req.body.password;
//     await user.save();
//     sendToken(user, 200, res)
// }

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect'));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)

})
// Update user profile   =>   /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.body.avatar)
    try {
        const newUserData = {
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            contact: req.body.contact,
            // email: req.body.email
        }
        // Update avatar
        if (req.body.avatar !== '') {
            const user = await User.findById(req.user.id)
            const image_id = user.avatar.public_id;
            const res = await cloudinary.v2.uploader.destroy(image_id);
            const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: 'servifind/avatar',
                width: 150,
                crop: "scale"
            })




            newUserData.avatar = {
                public_id: result.public_id,
                url: result.secure_url
            }
        }
        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            // useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
    }

})


exports.resetPassword = async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }
    // Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
    // {
    // "password": "password2",
    // "confirmPassword":password2
    // }
}









exports.deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    // if(!animal) {
    //     return res.status(404).json({
    //         success:false,
    //         message: 'Animal not found'
    //     })
    // }
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }
    await user.remove();
    res.status(200).json({
        success: true,
        message: 'User deleted'
    })
}

// exports.activateUser = async(req,res,next) =>{
//     const users = await User.findById(req.params.id);

// const newUserData = {
//     status:"inactive"
//   }
// if(users.status === active){
//     newUserData = {
//       status:"inactive"
//     }
// }
// else{
//     newUserData = {
//         status:"active"
//       }

// }

//     if(!users) {
//         return next(new ErrorHandler('User Not Found',404));
//     }
//     const user = await User.findByIdAndUpdate(req.users.id, newUserData, {
//         new: true,
//         runValidators: true,
//         // useFindAndModify: false
//     })
//     res.status(200).json({
//         success: true,
//         message: 'User Updated'
//     })
// }
exports.activateUser = async (req, res, next) => {
    let user = await User.findById(req.params.id);
    const UserData = {
        status: "activated"
    }
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }
    user = await User.findByIdAndUpdate(req.params.id, UserData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,
        user
    })
}
exports.deactivateUser = async (req, res, next) => {
    let user = await User.findById(req.params.id);
    const serData = {
        status: "deactivated"
    }



    if (!user) {
        return next(new ErrorHandler('User  not found', 404));
    }
    user = await User.findByIdAndUpdate(req.params.id, serData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,
        user
    })
}



