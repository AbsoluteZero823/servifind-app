const express = require('express');
const router = express.Router();

const { getCategories,
    newCategory,
    getSingleCategory,
    PaymentReceived,
    PaymentSent,
    categoryDone,
    createCategoryReview,
    getCategoryReviews,
    deleteReview,
} = require('../controllers/categoryController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/categories').get(getCategories);
router.route('/category/new').post(newCategory);
router.route('/category/:id').get(getSingleCategory);
// router.route('/category/:id').put(PaymentSent);
// router.route('/category/received/:id').put(PaymentReceived);
// router.route('/category/done/:id').put(categoryDone);
// router.route('/category/client/done/:id').put(categoryDoneC);
// router.route('/category/:id').put(updateCategory).delete(deleteCategory);

module.exports = router;