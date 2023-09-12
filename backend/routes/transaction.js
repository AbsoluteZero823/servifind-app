const express = require("express");
const router = express.Router();

const {
  getTransactions,
  newTransaction,
  getSingleTransaction,
  PaymentReceived,
  PaymentSent,
  transactionDone,
  rateDone,
  reportDone,
  updateTransaction,
  TransactionPerCourses,
  TransactionPerMonth,
  topTenServices,
  ServiceLeaderboards,
  getDashboardInfo,
  getDashboardCounts,
  TransactionPerUser,
  TransactionPerUserByMonth,
  getTransactionDashboard,
  getProcessingData,
  getToPayData,
  getToConfirmData,
  getCompletedData,

  //CODE SA MOBILE
  ClientCompleteTransaction,
  ClientRateTransaction,
  ClientReportTransaction,
  ClientFetchTransaction,

  FreelancerGenerateTransaction,
  FreelancerCompleteTransaction,
  FreelancerReportTransaction,
  FreelancerFetchTransaction,

  FetchTransactionbyOfferorInquiry,
  AddOffertoInquiryByCreatingTransaction,
} = require("../controllers/transactionController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/transactions").get(getTransactions);
router.route("/transaction/new").post(newTransaction);
router.route("/transaction/:id").get(getSingleTransaction);
router.route("/transaction/:id").put(PaymentSent);
router.route("/transaction/received/:id").put(PaymentReceived);
router.route("/transaction/done/:id").put(transactionDone);
router.route("/transaction/rated/:id").put(rateDone);
router.route("/transaction/reported/:id").put(reportDone);
router.route("/transaction-update/:id").put(updateTransaction);
router.route("/transactionpercourses").get(TransactionPerCourses);
router.route("/transactionperuser").get(TransactionPerUser);
router.route("/transactionperuserbymonth").get(TransactionPerUserByMonth);

router.route("/transactionpermonth").get(TransactionPerMonth);
router.route("/topservicepercourses").get(topTenServices);
router.route("/serviceleaderboards").get(ServiceLeaderboards);
router.route("/dashboardinfo").get(getDashboardInfo);
router.route("/dashboard/counts").get(isAuthenticatedUser, getDashboardCounts);
router.route("/transaction-dashboard").get(getTransactionDashboard);

router.route("/transaction-processing").get(getProcessingData);
router.route("/transaction-to-pay").get(getToPayData);
router.route("/transaction-to-confirm").get(getToConfirmData);
router.route("/transaction-completed").get(getCompletedData);
//CODE SA MOBILE
router
  .route("/mytransactions")
  .post(isAuthenticatedUser, ClientFetchTransaction);
router
  .route("/transactions/complete")
  .post(isAuthenticatedUser, ClientCompleteTransaction);
router
  .route("/transactions/client/rate")
  .post(isAuthenticatedUser, ClientRateTransaction);
router
  .route("/transactions/client/report")
  .post(isAuthenticatedUser, ClientReportTransaction);

router
  .route("/myfreelancertransactions")
  .post(isAuthenticatedUser, FreelancerFetchTransaction);
router
  .route("/myfreelancertransactions/generatetransaction")
  .post(isAuthenticatedUser, FreelancerGenerateTransaction);
router
  .route("/myfreelancertransactions/completetransaction")
  .post(isAuthenticatedUser, FreelancerCompleteTransaction);
router
  .route("/myfreelancertransactions/reporttransaction")
  .post(isAuthenticatedUser, FreelancerReportTransaction);

router
  .route("/messages/transaction/offerorinquiry")
  .post(isAuthenticatedUser, FetchTransactionbyOfferorInquiry);
router
  .route("/messages/transaction/offerorinquiry/new")
  .post(isAuthenticatedUser, AddOffertoInquiryByCreatingTransaction);
module.exports = router;
