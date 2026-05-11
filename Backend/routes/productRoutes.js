const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct } = require('../controllers/productController');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.route('/').get(getProducts).post(createProduct);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.route('/:id').get(getProductById);

module.exports = router;
