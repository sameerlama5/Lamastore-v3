// routes/productRoutes.js
const express = require('express');
const { getProducts, addProduct } = require('../controller/product');
const router = express.Router();

// Route to fetch all products
router.get('/products', getProducts);

// Route to add a new product
router.post('/products', addProduct);

module.exports = router;
