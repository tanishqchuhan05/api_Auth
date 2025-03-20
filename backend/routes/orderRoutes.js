const express = require("express");
const router = express.Router();
const { createOrder,getOrders, getTotalRevenue } = require("../controllers/orderController"); 
const  authMiddleware  = require("../middlewares/authMiddleware");



// Fetch orders for the logged-in user
router.get('/', authMiddleware, getOrders); // This is the new GET route to fetch orders

// ✅ Ensure createOrder is correctly used
router.post("/create", authMiddleware, createOrder);


// Route to fetch total revenue (Only accessible to admin)
router.get("/total-revenue", authMiddleware, getTotalRevenue);


module.exports = router;
