const express = require('express');
const router = express.Router();

const { getUserWithReports,
    newReport,
    getSingleReport,
    getUserReports,
    //CODE SA MOBILE
    getmyReports,
} = require('../controllers/reportController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/reports').get(getUserWithReports);
router.route('/report/new').post(newReport);
router.route('/report/:id').get(getSingleReport);
router.route('/user-reports/:id').get(getUserReports);
//CODE SA MOBILE
router.route('/myreports').post(isAuthenticatedUser, getmyReports);
module.exports = router;