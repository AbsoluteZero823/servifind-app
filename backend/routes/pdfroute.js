const express = require('express');
const router = express.Router();

const { topServicesPdf,

    monthlyIncomePdf,
    transactionsPdf,
    monthlyJoinPdf,
    topFreelancersPdf,
    processingTransactionsPdf,
    toPayTransactionsPdf,
    toConfirmTransactionsPdf,
    completedTransactionsPdf

} = require('../controllers/pdfController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/top-services-pdf').post(topServicesPdf);
router.route('/monthly-income-pdf').post(monthlyIncomePdf);
router.route('/transactions-pdf').post(transactionsPdf);
router.route('/top-freelancers-pdf').post(topFreelancersPdf);
router.route('/freelancer-monthly-join-pdf').post(monthlyJoinPdf);

router.route('/transactions-processing-pdf').post(processingTransactionsPdf);
router.route('/transactions-to-pay-pdf').post(toPayTransactionsPdf);
router.route('/transactions-to-confirm-pdf').post(toConfirmTransactionsPdf);
router.route('/transactions-completed-pdf').post(completedTransactionsPdf);
module.exports = router;