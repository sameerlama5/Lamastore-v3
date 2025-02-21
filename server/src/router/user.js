const { login, register } = require("../controller/user");
const express = require("express");
const router = express.Router();

// Login Route
router.post('/login',login)
router.post('/register',register)

module.exports = router