// const asyncHandler = require("express-async-handler");
const Message = require("../models/message");
const User = require("../models/user");
const Chat = require("../models/chat");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name avatar email")
      .populate("chat");
    res.json(messages);
    // res.status(200).json({
    //   // success: true,
    //   messages
    // })
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    // const inquiries = await Inquiry.find().populate(['customer', {
    //   path: 'service_id',

    //   populate: { path: 'user' }
    // }, {
    //     path: 'service_id',
    //     populate: { path: 'category' }
    //   },
    //   {
    //     path: 'freelancer',
    //     populate: { path: 'user_id' }
    //   }
    // ]);

    message = await message.populate(['chat', {
      path: 'sender',
      model: 'user'
    }]);
    // message = await message.populate("sender", "name avatar").execPopulate();
    // message = await message.populate("chat").execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name avatar email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    // res.json(message);
    res.status(200).json({
      success: true,
      message
    })
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = { allMessages, sendMessage };