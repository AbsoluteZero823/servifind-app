const express = require('express');
const router = express.Router();

const { getInquiries,
    newInquiry,
    getMyInquiries,
    getClientInquiries,
    getSingleInquiry,
    updateStatus,
    deleteService,
    createServiceReview,
    getServiceReviews,
    deleteReview
} = require('../controllers/inquiryController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/inquiries').get(isAuthenticatedUser,getInquiries);
router.route('/my-inquiries').get(isAuthenticatedUser,getMyInquiries);
router.route('/client-inquiries').get(isAuthenticatedUser,getClientInquiries);
router.route('/inquiry/new').post(newInquiry);
router.route('/inquiry/:id').get(getSingleInquiry);
// router.route('/service/:id').put(updateService).delete(deleteService);
router.route('/inquiry/:id').put(updateStatus);
module.exports = router;