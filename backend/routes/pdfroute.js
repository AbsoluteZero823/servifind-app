const express = require('express');
const router = express.Router();

const { topServicesPdf,

    monthlyIncomePdf

} = require('../controllers/pdfController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/top-services-pdf').post(topServicesPdf);
router.route('/monthly-income-pdf').post(monthlyIncomePdf);

module.exports = router;