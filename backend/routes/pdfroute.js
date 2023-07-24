const express = require('express');
const router = express.Router();

const { generatePdf,


} = require('../controllers/pdfController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/pdf-generate').post(generatePdf);

module.exports = router;