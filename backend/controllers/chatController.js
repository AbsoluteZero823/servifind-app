// const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat");
const User = require("../models/user");
const Inquiry = require("../models/inquiry");
const Offer = require("../models/offer");
const ErrorHandler = require('../utils/errorHandler');


//@description     Create or fetch One to One Chat
//@route           POST /api/v1/chat/
//@access          Protected
exports.accessChat = async (req, res, next) => {
  console.log(req.body);
  const { userId, inquiryId, offerId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  let chatName = "";


  if (inquiryId) {
    const inquiry = await Inquiry.findOne({ _id: inquiryId }).populate({ path: 'service_id', populate: { path: 'user' } });
    chatName = `Inquiry: ${inquiry.service_id.user.name} - ${inquiry.service_id.title || inquiry.service_id.name}`;
  } else if (offerId) {
    const offer = await Offer.findOne({ _id: offerId }).populate('service_id offered_by');
    chatName = `Offer: ${offer.offered_by.name} - ${offer.service_id.title || offer.service_id.name}`;
  }

  let chatQuery = {
    users: { $all: [req.user._id, userId] },
  };

  if (inquiryId) {
    chatQuery.inquiry_id = inquiryId;
  } else if (offerId) {
    chatQuery.offer_id = offerId;
  } else {
    // No related inquiry or offer, proceed to create chat instance
    chatQuery = {
      users: { $all: [req.user._id, userId] },
    };
  }
  try {
    let isChat = await Chat.findOne(chatQuery)
      .populate("users", "-password")
      .populate("latestMessage")
      .populate({
        path: "inquiry_id",
        select: "subject",
      })
      .populate({
        path: "offer_id",
        select: "title",
      });

    if (isChat) {
      res.status(200).json({ success: true, isChat });
    } else {
      let chatData = {
        chatName,
        users: [req.user._id, userId],
      };

      if (inquiryId) {
        chatData.inquiry_id = inquiryId;
      } else if (offerId) {
        chatData.offer_id = offerId;
      }

      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }

  // var isChat = await Chat.findOne({
  //   $and: [
  //     { users: { $elemMatch: { $eq: req.user._id } } },
  //     { users: { $elemMatch: { $eq: userId } } },
  //   ],
  // })
  //   .populate("users", "-password")
  //   .populate("latestMessage");

  // isChat = await User.populate(isChat, {
  //   path: "latestMessage.sender",
  //   select: "name pic email",
  // });

  // if (isChat.length > 0) {
  //   res.send(isChat[0]);
  // } else {
  //   var chatData = {
  //     chatName: req.body.chatName,
  //     users: [req.user._id, userId],
  //     inquiry_id: inquiry_id
  //   };

  //   try {
  //     const createdChat = await Chat.create(chatData);
  //     const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
  //       "users",
  //       "-password"
  //     );
  //     res.status(200).json(FullChat);
  //   } catch (error) {
  //     res.status(400);
  //     throw new Error(error.message);
  //   }
  // }

}


//@description     Fetch all chats for a user
//@route           GET /api/v1/chat/
//@access          Protected
exports.fetchChats = async (req, res, next) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("inquiry_id")
      //   .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (chats) => {
        chats = await User.populate(chats, {
          path: "latestMessage.sender",
          select: "name avatar email",
        });
        res.status(200).json({
          success: true,
          chats
        })




        // .send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}


