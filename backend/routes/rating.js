const express = require('express');
const router = express.Router();

const { getRatings,
    newRating,
    getSingleRating,
    //CODE SA MOBILE
    getMyServiceRatings,
    PaymentReceived,
    PaymentSent,
    ratingDone,
    createRatingReview,
    getRatingReviews,
    deleteReview,
    getMyFRatings,
    getMyCRatings
} = require('../controllers/ratingController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/ratings').get(getRatings);
router.route('/rating/new').post(newRating);
router.route('/rating/:id').get(getSingleRating);

//CODE SA MOBILE
router.route('/myratings').post(isAuthenticatedUser, getMyServiceRatings);

// router.route('/rating/:id').put(PaymentSent);
// router.route('/rating/received/:id').put(PaymentReceived);
// router.route('/rating/done/:id').put(ratingDone);
// router.route('/rating/client/done/:id').put(ratingDoneC);
// router.route('/rating/:id').put(updateRating).delete(deleteRating);
// router.route('/my/ratingsf').get(getMyFRatings);
// router.route('/my/ratingsc').get(isAuthenticatedUser, getMyCRatings);


module.exports = router;