const express = require('express');
const router = express.Router();

const { getOffers,
    newOffer,
    getSingleOffer,
    getRequestOffers,
    cancelOtherOffer,
    acceptOffer,
    updateOffer,
    //CODE SA MOBILE
    getmyOffers,
} = require('../controllers/offerController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/offers').get(getOffers);
router.route('/offer/new').post(isAuthenticatedUser, newOffer);
router.route('/offer/:id').get(getSingleOffer);
router.route('/offers-request/:request_id').get(getRequestOffers);
router.route('/cancel-offer/:id').put(cancelOtherOffer);
router.route('/accept-offer/:id').put(acceptOffer);
router.route('/offer/:id').put(updateOffer);
//CODE SA MOBILE
router.route('/myoffers').get(isAuthenticatedUser, getmyOffers);
// router.route('/offer/:id').put(PaymentSent);
// router.route('/offer/received/:id').put(PaymentReceived);
// router.route('/offer/done/:id').put(offerDone);
// router.route('/offer/client/done/:id').put(offerDoneC);
// router.route('/offer/:id').put(updateOffer).delete(deleteOffer);
// router.route('/my/offersf').get(getMyFOffers);
// router.route('/my/offersc').get(isAuthenticatedUser, getMyCOffers);
module.exports = router;