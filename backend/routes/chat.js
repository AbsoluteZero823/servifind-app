const express = require("express");
const router = express.Router();
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatController");
// const { protect } = require("../middleware/authMiddleware");
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route("/chat").post(isAuthenticatedUser, accessChat);
router.route("/chat").get(isAuthenticatedUser, fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, removeFromGroup);
// router.route("/groupadd").put(protect, addToGroup);

module.exports = router;