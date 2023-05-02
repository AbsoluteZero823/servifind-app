const express = require('express');
const router = express.Router();

const { getReports,
    newReport,
    getSingleReport,
    //CODE SA MOBILE
    getmyReports,
} = require('../controllers/reportController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/reports').get(getReports);
router.route('/report/new').post(newReport);
router.route('/report/:id').get(getSingleReport);
//CODE SA MOBILE
router.route('/myreports').post(isAuthenticatedUser, getmyReports);
module.exports = router;