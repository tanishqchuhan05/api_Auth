const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/orderController"); 
const  authMiddleware  = require("../middlewares/authMiddleware");


// ✅ Ensure createOrder is correctly used
router.post("/create", authMiddleware, createOrder);

module.exports = router;
