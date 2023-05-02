const express = require('express');
const router = express.Router();

const { getRequests,
    newRequest,
    getSingleRequest,
    // CODE SA MOBILE
    getAllexceptMyRequest,
    getMyRequests,
    getMyRequest,
    editMyRequest,
    deleteMyRequest,
    refuseanOffer,
    refuseaPrice,
    acceptanOffer,
} = require('../controllers/requestController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/requests').get(getRequests);
router.route('/request/new').post(isAuthenticatedUser, newRequest);
router.route('/request/:id').get(getSingleRequest);
// CODE SA MOBILE
router.route('/requests/freelancer').post(isAuthenticatedUser, getAllexceptMyRequest);
router.route('/myrequests').get(isAuthenticatedUser, getMyRequests);
router.route('/myrequests/:id').get(isAuthenticatedUser, getMyRequest);
router.route('/myrequest/edit/:id').put(isAuthenticatedUser, editMyRequest);
router.route('/myrequest/cancel/:id').put(isAuthenticatedUser, deleteMyRequest);

router.route('/myrequest/offer/refuseoffer').post(isAuthenticatedUser, refuseanOffer);
router.route('/myrequest/offer/refuseprice').post(isAuthenticatedUser, refuseaPrice);
router.route('/myrequest/offer/accept').post(isAuthenticatedUser, acceptanOffer);
module.exports = router;