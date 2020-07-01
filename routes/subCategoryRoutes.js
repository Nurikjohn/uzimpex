const express = require('express');

const subCategoryController = require('./../controllers/subCategoryController');

const router = express.Router();

router
    .route('/category/:id')
    .get(subCategoryController.getAllSubCategories)
    .post(subCategoryController.createSubCategory);

router
    .route('/:id')
    .get(subCategoryController.getSubCategory)
    .patch(subCategoryController.updateSubCategory)
    .delete(subCategoryController.deleteSubCategory);

module.exports = router;