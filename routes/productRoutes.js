const express = require('express');

const productController = require('./../controllers/productController');

const router = express.Router();

router
    .route('/')
    .get(productController.getAllProducts)
    .post(productController.uploadImage ,productController.createProduct);

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(productController.uploadImage, productController.updateProduct)
    .delete(productController.deleteProduct);

router.patch('/:id', productController.getAllProducts);

module.exports = router;