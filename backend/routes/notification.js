const express = require("express");
const router = express.Router();

const {
  newNotification,
  getNotifications,
  getmyNotifications,
  MakeNotificationRead,
} = require("../controllers/notificationController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/notifications").get(getNotifications);
router.route("/notification/new").post(newNotification);
router.route("/my-notifications").get(isAuthenticatedUser, getmyNotifications);
router.route("/read-notification/:id").put(isAuthenticatedUser,MakeNotificationRead);
// router.route("/report/:id").get(getSingleReport);
// router.route("/user-reports/:id").get(getUserReports);


module.exports = router;
