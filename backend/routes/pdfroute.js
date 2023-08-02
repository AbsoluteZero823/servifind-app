const express = require('express');
const router = express.Router();

const { topServicesPdf,

    monthlyIncomePdf,
    transactionsPdf

} = require('../controllers/pdfController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/top-services-pdf').post(topServicesPdf);
router.route('/monthly-income-pdf').post(monthlyIncomePdf);
router.route('/transactions-pdf').post(transactionsPdf);

module.exports = router;