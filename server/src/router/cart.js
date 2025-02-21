const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { addToCart, getUserCart } = require('../controller/cart');
const router = express.Router();


// Add item to cart
router.post('/cart', addToCart);

// Get user's cart items
router.post('/item', getUserCart);

module.exports = router;
