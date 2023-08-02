const { reset } = require("nodemon");
const Transaction = require("../models/transaction");
const cloudinary = require("cloudinary");
const Request = require("../models/request");
const Offer = require("../models/offer");
const Inquiry = require("../models/inquiry");
const Rating = require("../models/rating");
const Report = require("../models/report");
const Freelancer = require("../models/freelancer");
const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { now } = require("mongoose");
// const  Category  = require('../models/category');

exports.newTransaction = async (req, res, next) => {
  // console.log(req.body);
  // req.body.user = req.user.id;
  const transaction = await Transaction.create(req.body);

  res.status(201).json({
    success: true,
    transaction,
  });
};

//all Transactions
exports.getTransactions = async (req, res, next) => {
  const sort = { _id: -1 };
  if (req.query.fromDate) {
    console.log(req.query)
    const transactions = await Transaction.find({
      created_At: {
        $gte: req.query.fromDate, // $gte means "greater than or equal to"
        $lte: req.query.toDate,    // $lte means "less than or equal to"
      }
    })
    res.status(200).json({
      success: true,
      transactions,
    });
  }
  else {
    console.log(req, 'else')
    const transactions = await Transaction.find()
      .sort(sort)
      .populate([
        {
          path: "inquiry_id",

          populate: { path: "customer" },
        },
        {
          path: "inquiry_id",
          model: "Inquiry",
          populate: {
            path: "freelancer",
            model: "Freelancer",
            populate: {
              path: "user_id",
              model: "user",
            },
          },
        },
        {
          path: "inquiry_id",
          model: "Inquiry",
          populate: {
            path: "service_id",
          },
        },
        {
          path: "offer_id",
          model: "Offer",
          populate: {
            path: "request_id",
            model: "Request",
            populate: {
              path: "requested_by",
              model: "user",
            },
          },
        },
        {
          path: "offer_id",
          model: "Offer",
          populate: {
            path: "offered_by",
          },
        },
        {
          path: "offer_id",
          model: "Offer",
          populate: {
            path: "service_id",
          },
        },
      ]);
    res.status(200).json({
      success: true,
      transactions,
    });
  }


};

exports.getSingleTransaction = async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id).populate([
    {
      path: "inquiry_id",

      populate: { path: "customer" },
    },
    {
      path: "inquiry_id",
      model: "Inquiry",
      populate: {
        path: "freelancer",
        model: "Freelancer",
        populate: {
          path: "user_id",
          model: "user",
        },
      },
    },
    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "service_id",
        model: "Service",
        populate: {
          path: "freelancer_id",
          model: "Freelancer",
          populate: {
            path: "user_id",
            model: "user",
          },
        },
      },
    },
    {
      path: "inquiry_id",
      model: "Inquiry",
      populate: {
        path: "service_id",
      },
    },
  ]);

  if (!transaction) {
    return next(new ErrorHandler("Inquiry not found", 404));
  }
  res.status(200).json({
    success: true,
    transaction,
  });
};

exports.PaymentSent = async (req, res, next) => {
  console.log(req.query);
  const statusData = {
    paymentSent: req.body.paymentSent,
  };

  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    statusData,
    {
      new: true,
      runValidators: true,
      // useFindandModify:false
    }
  ).populate([

    {
      path: "offer_id",
      model: "Offer",
    },
    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "request_id",
        model: "Request",
        populate: {
          path: "requested_by",
          model: "user"
        }
      }
    },
    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "inquiry_id",
        model: "Inquiry",
        populate: {
          path: "customer",
          model: "user"
        }
      }
    }

  ]);

  res.status(200).json({
    success: true,
    updatedTransaction: transaction
  });
};
exports.PaymentReceived = async (req, res, next) => {
  // console.log(req.body);
  const statusData = {
    paymentReceived: req.body.paymentReceived,
  };

  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    statusData,
    {
      new: true,
      runValidators: true,
      // useFindandModify:false
    }
  ).populate([

    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "offered_by",
        model: "user"

      },
    },
    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "request_id",

      }
    },
    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "inquiry_id",

      }
    }

  ]);
  res.status(200).json({
    success: true,
    updatedTransaction: transaction
  });
};

exports.transactionDone = async (req, res, next) => {
  // console.log(req.body);

  if (req.body.freelancer === "true" && req.body.client === "true") {
    formData = {
      status: "completed",
    };
    formData.transaction_done = {
      client: req.body.client,
      freelancer: req.body.freelancer,
      workCompleted: req.body.workCompleted,
      transactionCompleted: now(),
    };
  } else if (req.body.freelancer === "true" && req.body.client === "false") {
    formData = {};
    formData.transaction_done = {
      client: req.body.client,
      freelancer: req.body.freelancer,
      workCompleted: now(),
    };
  } else {
    formData = {};

    formData.transaction_done = {
      client: req.body.client,
      freelancer: req.body.freelancer,
    };
  }
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    formData,
    {
      new: true,
      runValidators: true,
      // useFindandModify:false
    }

  ).populate([

    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "offered_by",
        model: "user"

      },
    },
    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "request_id",

      }
    },
    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "inquiry_id",

      }
    }

  ]);;

  console.log(transaction)

  res.status(200).json({
    success: true,
    updatedTransaction: transaction
  });
};

exports.rateDone = async (req, res, next) => {
  // console.log(req.body);
  const isRatedData = {
    isRated: "true",
  };
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      isRatedData,
      {
        new: true,
        runValidators: true,
        // useFindandModify:false
      }
    ).populate([

      {
        path: "offer_id",
        model: "Offer",
      },
      {
        path: "offer_id",
        model: "Offer",
        populate: {
          path: "request_id",
          model: "Request",
          populate: {
            path: "requested_by",
            model: "user"
          }
        }
      },
      {
        path: "offer_id",
        model: "Offer",
        populate: {
          path: "inquiry_id",
          model: "Inquiry",
          populate: {
            path: "customer",
            model: "user"
          }
        }
      }

    ]);
    console.log(transaction, 'for rate')
    res.status(200).json({
      success: true,
      updatedTransaction: transaction
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

};

exports.reportDone = async (req, res, next) => {
  // console.log(req.body);

  formData = {};
  formData.reportedBy = {
    client: req.body.client,
    freelancer: req.body.freelancer,
  };

  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    formData,
    {
      new: true,
      runValidators: true,
      // useFindandModify:false
    }
  );
  res.status(200).json({
    success: true,
    updatedTransaction: transaction
  });
};

exports.updateTransaction = async (req, res, next) => {
  let transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(new ErrorHandler("Transaction not found", 404));
  }
  transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    // useFindandModify:false
  });
  res.status(200).json({
    success: true,
    transaction,
  });
};

exports.topTenServices = async (req, res, next) => {
  // try {
  //     const transactions = await Transaction.find().populate([
  //     {
  //         path: 'offer_id',
  //         model: 'Offer',
  //         populate: {
  //             path: 'service_id',
  //             model: 'Service',
  //             populate: {
  //                 path: 'category',
  //                 model: 'category'
  //             }
  //         }
  //     },
  //     ]);
  //     res.status(200).json({
  //         success: true,
  //         transactions
  //     })
  // } catch (error) {

  // }

  let topServicesArr = [];

  const NumberOfCategory = await Transaction.find({
    "transaction_done.client": true,
    "transaction_done.freelancer": true,
  }).populate([
    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "service_id",
        model: "Service",
        populate: {
          path: "category",
          model: "category",
        },
      },
    },
  ]);

  for (let i = 0; i < NumberOfCategory.length; i++) {
    // console.log(NumberOfSection[i].offer_id.offered_by.freelancer_id.course)
    // console.log(NumberOfSection.length)
    topServicesArr.push({
      section: NumberOfCategory[i].offer_id.service_id.category.name,
      finishedDate: NumberOfCategory[i].transaction_done.transactionCompleted,
    });
  }
  // console.log(topServicesArr);
  res.status(200).json({
    success: true,
    topServicesArr,
  });
};

exports.TransactionPerCourses = async (req, res, next) => {
  let sectionArr = [];

  const NumberOfSection = await Transaction.find({
    "transaction_done.client": true,
    "transaction_done.freelancer": true,
  }).populate([
    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "offered_by",
        model: "user",
        populate: {
          path: "freelancer_id",
        },
      },
    },
  ]);

  for (let i = 0; i < NumberOfSection.length; i++) {
    // console.log(NumberOfSection[i].offer_id.offered_by.freelancer_id.course)
    // console.log(NumberOfSection.length)
    sectionArr.push({
      section: NumberOfSection[i].offer_id.offered_by.freelancer_id.course,
      createdDate: NumberOfSection[i].created_At,
    });
  }
  // console.log(sectionArr);
  res.status(200).json({
    success: true,
    sectionArr,
  });
};
exports.TransactionPerMonth = async (req, res, next) => {
  const completionDate = await Transaction.find({
    "transaction_done.client": true,
    "transaction_done.freelancer": true,
  });
  // console.log(borrowedDate);
  res.status(200).json({
    success: true,
    completionDate,
  });
};

exports.ServiceLeaderboards = async (req, res, next) => {
  const transactions = await Transaction.find({
    "transaction_done.client": true,
    "transaction_done.freelancer": true,
  }).populate([
    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "service_id",
        model: "Service",
        populate: {
          path: "category",
          model: "category",
        },
      },
    },
  ]);

  // Fetch ratings for each service
  const serviceName = transactions.map(
    (transaction) => transaction.offer_id.service_id.category.name
  );

  const countService = serviceName.reduce((map, item) => {
    map[item] = (map[item] || 0) + 1;
    return map;
  }, {});

  const sortedService = Object.entries(countService)
    .sort((a, b) => b[1] - a[1])
    .map(([service, count]) => ({ service, count }));

  res.status(200).json({
    success: true,
    sortedService,
  });
};

exports.getDashboardInfo = async (req, res, next) => {
  // const services = await Service.find().populate('freelancer_id');
  // const freelancer = await Freelancer.find({ approve_date: { $exists: true, $ne: null } }).populate('freelancer_id');

  const freelancerAndServiceCount = await Freelancer.aggregate([
    {
      $match: {
        approved_date: { $exists: true },
      },
    },
    {
      $lookup: {
        from: "services",
        localField: "_id",
        foreignField: "freelancer_id",
        as: "services",
      },
    },
    {
      $group: {
        _id: null,
        freelancerCount: { $sum: 1 },
        serviceCount: { $sum: { $size: "$services" } },
      },
    },
    {
      $sort: {
        transaction: 1,
      },
    },
  ]);

  const userCount = await User.aggregate([
    {
      $match: {
        status: "activated",
        verified: true,
        isAdmin: false,
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);

  const transactionCount = await Transaction.aggregate([
    {
      $match: {
        status: "completed",
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);

  const [freelancerAndServiceResult, userResult, transactionResult] =
    await Promise.all([freelancerAndServiceCount, userCount, transactionCount]);

  const result = {
    freelancerCount: (freelancerAndServiceResult[0]) ? freelancerAndServiceResult[0].freelancerCount : 0,
    serviceCount: freelancerAndServiceResult[0] ? freelancerAndServiceResult[0].serviceCount : 0,
    userCount: userResult[0] ? userResult[0].count : 0,
    transactionCount: transactionResult[0] ? transactionResult[0].count : 0,
  };
  // const freelancerCount = freelancer.length()
  // const freelancerCount = freelancer.length()

  res.status(200).json({
    success: true,
    result,
  });
};

exports.getDashboardCounts = async (req, res, next) => {
  const transactions = await Transaction.find().populate([
    {
      path: "inquiry_id",

      populate: { path: "customer" },
    },
    {
      path: "inquiry_id",
      model: "Inquiry",
      populate: {
        path: "freelancer",
        model: "Freelancer",
        populate: {
          path: "user_id",
          model: "user",
        },
      },
    },
    {
      path: "inquiry_id",
      model: "Inquiry",
      populate: {
        path: "service_id",
      },
    },
    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "request_id",
        model: "Request",
        populate: {
          path: "requested_by",
          model: "user",
        },
      },
    },
    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "offered_by",
      },
    },
    {
      path: "offer_id",
      model: "Offer",
      populate: {
        path: "service_id",
      },
    },
  ]);

  //   console.log(req.user);
  const freelancerThroughInquiry = transactions.filter(
    (transaction) =>
      transaction.inquiry_id &&
      transaction.inquiry_id.freelancer &&
      transaction.inquiry_id.freelancer.user_id &&
      transaction.inquiry_id.freelancer.user_id._id.toString() ===
      req.user._id.toString()
  );

  const freelancerThroughRequest = transactions.filter(
    (transaction) =>
      transaction.offer_id &&
      transaction.offer_id.request_id &&
      transaction.offer_id.offered_by &&
      transaction.offer_id.offered_by._id.toString() === req.user._id.toString()
  );

  const combinedResults = freelancerThroughInquiry.concat(
    freelancerThroughRequest
  );

  const completedTransaction = combinedResults.filter(
    (transaction) => transaction.status === "completed"
  );
  const processingTransaction = combinedResults.filter(
    (transaction) => transaction.status === "processing"
  );

  //   completedTransactionCount = completedTransaction.length;
  //   processingTransactionCount = processingTransaction.length;

  console.log(completedTransaction.length);

  const myinquiries = await Inquiry.find({ customer: req.user._id })
  const myrequests = await Request.find({ requested_by: req.user._id })
  const totalInquiriesAndRequest = myinquiries.length + myrequests.length;
  // console.log(myinquiries);
  //   console.log(total);

  const result = {
    total: combinedResults.length,
    completed: completedTransaction.length,
    processing: processingTransaction.length,
    inquiries: myinquiries.length,
    request: myrequests.length,
    totalInquiriesAndRequest: totalInquiriesAndRequest
  };

  res.status(200).json({
    success: true,
    result,
  });
};


exports.TransactionPerUser = async (req, res, next) => {
  try {
    const transactionCounts = {}; // Object to store transaction counts for each user

    const transactions = await Transaction.find({
      "transaction_done.client": true,
      "transaction_done.freelancer": true,
    }).populate([
      {
        path: "offer_id",
        model: "Offer",
        populate: {
          path: "offered_by",
          model: "user",
          populate: {
            path: "freelancer_id",
          },
        },
      },
    ]);

    for (let i = 0; i < transactions.length; i++) {
      const user = transactions[i].offer_id.offered_by.freelancer_id.gcash_name;
      // If the user is encountered for the first time, initialize the count to 1
      if (!transactionCounts[user]) {
        transactionCounts[user] = 1;
      } else {
        // If the user has already been encountered, increment the count
        transactionCounts[user]++;
      }
    }

    // Convert the transactionCounts object into an array of objects
    const sectionArr = Object.entries(transactionCounts).map(([user, count]) => ({
      section: user,
      count: count,
    }));

    res.status(200).json({
      success: true,
      sectionArr,
    });
  } catch (err) {
    // Handle any errors that occur during the execution
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// CODES SA MOBILE BALIKAN PARA SA ROUTES
exports.ClientFetchTransaction = async (req, res, next) => {
  try {
    // Get all the user's requests
    const requests = await Request.find({ requested_by: req.user._id });
    const requestIds = requests.map((request) => request._id);

    // Get all the offers associated with those requests
    const offers = await Offer.find({
      request_id: { $in: requestIds },
    }).populate("service_id");

    // Get all the transactions associated with those offers
    const transactions = await Transaction.find({
      offer_id: { $in: offers.map((offer) => offer._id) },
    }).populate({
      path: "offer_id",
      populate: {
        path: "offered_by service_id",
      },
    });
    // Return the transactions
    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.ClientCompleteTransaction = async (req, res, next) => {
  if (req.body.gcashreceipt) {
    const result = await cloudinary.v2.uploader.upload(req.body.gcashreceipt, {
      folder: "servifind/gcashreceipts",
      width: 150,
      crop: "scale",
    });
    req.body.gcashreceipt = result.secure_url;
  }
  req.body.isPaid = true;
  req.body.paymentSent = true;
  req.body.created_at = new Date();
  req.body.transaction_done = { client: true };

  const transactionexist = await Transaction.findOneAndUpdate(
    {
      offer_id: req.body.offer_id,
    },
    req.body,
    {
      new: true,
    }
  );

  if (transactionexist) {
    return res
      .status(200)
      .json({ success: true, message: "Transaction Completed!" });
  } else {
    const transaction = await Transaction.create(req.body);
    res.status(201).json({
      success: true,
      transaction,
    });
  }
};

exports.ClientRateTransaction = async (req, res, next) => {
  const { rating, comment, service_id, transaction_id } = req.body;
  try {
    // Update the Transaction with the given transaction_id to set isRated to true
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transaction_id,
      { isRated: "true" },
      { new: true }
    );
    // Create a new Rating data with the given rating, comment, service_id, and transaction_id
    const newRating = new Rating({
      rating,
      comment,
      user: req.user._id, // assuming you have a logged-in user
      service_id,
      transaction_id,
    });
    const savedRating = await newRating.save();
    return res.status(200).json({
      success: true,
      message: "Freelancer Rating added successfully!",
    });
  } catch (error) {
    return next(error);
  }
};

exports.ClientReportTransaction = async (req, res, next) => {
  const { reason, description, user_reported, _id } = req.body;
  try {
    // Update the Transaction with the given transaction_id to set reportedBy.client to true
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      _id,
      { "reportedBy.client": "true" },
      { new: true }
    );
    // Create a new Report data with the given reason, description, user_reported, and transaction_id
    const newReport = new Report({
      reason,
      description,
      reported_by: req.user._id, // assuming you have a logged-in user
      user_reported,
      transaction_id: _id,
    });
    const savedReport = await newReport.save();
    return res.status(200).json({
      success: true,
      message: "Freelancer Report added successfully!",
    });
  } catch (error) {
    return next(error);
  }
};

exports.FreelancerFetchTransaction = async (req, res, next) => {
  try {
    // Get all the offers associated with the user
    const offers = await Offer.find({ offered_by: req.user._id });
    // Get all the transactions associated with those offers
    const transactions = await Transaction.find({
      offer_id: { $in: offers.map((offer) => offer._id) },
    }).populate({
      path: "offer_id",
      populate: [
        { path: "service_id" },
        { path: "request_id", populate: { path: "requested_by" } },
        { path: "inquiry_id", populate: { path: "customer" } },
      ],
    });
    // Return the transactions
    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.FreelancerGenerateTransaction = async (req, res, next) => {
  req.body.created_at = new Date();

  const transactionexist = await Transaction.findOneAndUpdate(
    {
      offer_id: req.body.offer_id,
    },
    req.body,
    {
      new: true,
    }
  );

  if (transactionexist) {
    console.log(transactionexist);
    return res
      .status(200)
      .json({ success: true, message: "Transaction Completed!" });
  }

  const transaction = await Transaction.create(req.body);
  res.status(201).json({
    success: true,
    transaction,
  });
};

exports.FreelancerCompleteTransaction = async (req, res, next) => {
  const params = {};
  params.isPaid = "true";
  params.paymentSent = "true";
  params.paymentReceived = "true";
  params.transaction_done = {
    client: "true",
    freelancer: "true",
    workCompleted: new Date(),
    transactionCompleted: new Date(),
  };
  params.finished_At = new Date();
  params.status = "completed";
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.body._id,
      params,
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Transaction Completed!" });
  } catch (error) {
    return next(error);
  }
};

exports.FreelancerReportTransaction = async (req, res, next) => {
  const { reason, description, user_reported, _id } = req.body;
  try {
    // Update the Transaction with the given transaction_id to set reportedBy.client to true
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      _id,
      { "reportedBy.freelancer": "true" },
      { new: true }
    );
    // Create a new Report data with the given reason, description, user_reported, and transaction_id
    const newReport = new Report({
      reason,
      description,
      reported_by: req.user._id, // assuming you have a logged-in user
      user_reported,
      transaction_id: _id,
    });
    const savedReport = await newReport.save();
    return res.status(200).json({ success: true, message: "Report Sent!" });
  } catch (error) {
    return next(error);
  }
};

exports.FetchTransactionbyOfferorInquiry = async (req, res, next) => {
  const { offer_id, inquiry_id } = req.body;
  try {
    let query = {};
    if (offer_id !== null && offer_id !== undefined) {
      query.offer_id = offer_id;
    }
    if (inquiry_id !== null && inquiry_id !== undefined) {
      query.inquiry_id = inquiry_id;
    }
    const transaction = await Transaction.findOne(query).populate({
      path: "offer_id",
      populate: {
        path: "service_id",
        populate: {
          path: "freelancer_id",
          model: "Freelancer",
        },
      },
    });
    if (!transaction) {
      return res
        .status(200)
        .json({ success: false, message: "No transaction found." });
    }
    return res.status(200).json({ success: true, transaction });
  } catch (error) {
    return next(error);
  }
};

exports.AddOffertoInquiryByCreatingTransaction = async (req, res, next) => {
  try {
    const { inquiry_id, transactiondetails } = req.body;
    // Check if there is an existing transaction for the offer
    if (transactiondetails) {
      const _id = transactiondetails._id;
      const transaction = await Transaction.findByIdAndUpdate(
        _id,
        { price: req.body.price, status: "processing" },
        { new: true }
      );
      const offer = await Offer.findByIdAndUpdate(
        transactiondetails.offer_id._id,
        {
          offer_status: "waiting",
          description: req.body.description,
        }
      );
      return res.status(200).json({
        success: true,
        message: "Transaction updated successfully",
        transaction,
      });
    }

    // Find the Inquiry object with the given inquiry_id and set its status to "granted".
    const inquiry = await Inquiry.findByIdAndUpdate(
      inquiry_id,
      { status: "granted" },
      { new: true }
    );
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    // Create a new Offer object with the required fields.
    const offer = new Offer({
      ...req.body,
      offered_by: req.user._id,
    });

    // Save the new Offer object to the database.
    const savedOffer = await offer.save();

    // Create a new Transaction object with the required fields,
    // including the offer_id of the newly created Offer.
    const transaction = new Transaction({
      offer_id: savedOffer._id,
      ...req.body,
      transaction_status: "processing",
    });

    // Save the new Transaction object to the database.
    const savedTransaction = await transaction.save();
    console.log(savedTransaction);
    return res.status(200).json({
      success: true,
      message: "Offer added to inquiry successfully",
      offer: savedOffer,
      transaction: savedTransaction,
      inquiry: inquiry,
    });
  } catch (error) {
    return next(error);
  }
};
