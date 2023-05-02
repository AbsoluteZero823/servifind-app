const express = require('express');
const router = express.Router();

const { getFreelancers,
    newFreelancer,
    getSingleFreelancer,
    getApplicationEntries,
    approveApplication,
    rejectApplication,
    availPremium,
    getApplicationPremium,
    approveApplicationPremium,
    rejectApplicationPremium,
    availabiltyUpdate,
    completeFreelancerSetup,
    //CODE SA MOBILE
    makemeaFreelancer,
    getmyFreelancers,
    updatemyFreelancers,
    upgrademyFreelancer,
    newupgrade,
    getfreelancerjobs,

} = require('../controllers/freelancerController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/freelancers').get(isAuthenticatedUser, getFreelancers);
router.route('/freelancer/new').post(isAuthenticatedUser, newFreelancer);
router.route('/freelancer/:id').get(getSingleFreelancer);
router.route('/application-entries').get(getApplicationEntries);
router.route('/application-approve/:id').put(approveApplication);
router.route('/application-reject/:id').put(rejectApplication);
router.route('/avail-premium').put(isAuthenticatedUser, availPremium);
router.route('/application-premium').get(getApplicationPremium);
router.route('/approve-premium/:id').put(approveApplicationPremium);
router.route('/reject-premium/:id').put(rejectApplicationPremium);
router.route('/availability-update').put(isAuthenticatedUser, availabiltyUpdate);
router.route('/complete-setup').put(isAuthenticatedUser, completeFreelancerSetup);

//CODE SA MOBILE
router.route('/freelancers/register').post(isAuthenticatedUser, makemeaFreelancer);
router.route('/freelancers/me').post(isAuthenticatedUser, getmyFreelancers);
router.route('/freelancers/update').post(isAuthenticatedUser, updatemyFreelancers);
router.route('/freelancers/upgrade').post(isAuthenticatedUser, upgrademyFreelancer);
module.exports = router;