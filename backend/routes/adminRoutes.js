const express = require ('express');
const {getDashboardStats} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//Admin Dashboard Route
router.get("/dashboard", authMiddleware, getDashboardStats);


module.exports = router;