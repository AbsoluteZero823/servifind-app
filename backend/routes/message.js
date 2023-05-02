const express = require("express");
const router = express.Router();
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageController");
// const { protect } = require("../middleware/authMiddleware");
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route("/messages/:chatId").get(isAuthenticatedUser, allMessages);
router.route("/message/new").post(isAuthenticatedUser, sendMessage);

module.exports = router;