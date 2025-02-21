// routes/categoryRoutes.js
const express = require('express');
const { getCategories,addCategory } = require('../controller/categories');

const router = express.Router();

// Route to get all categories
router.get('/categories', getCategories);

// Route to add a new category
router.post('/categories', addCategory);

module.exports = router;
