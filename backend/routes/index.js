const express = require("express");
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const movieRoutes = require("./movieRoutes");
const orderRoutes = require("./orderRoutes");
const ROUTES = require("./routesEnum");

const router = express.Router();

// ✅ API Versioning
const API_VERSION = "/api/v1";

router.use(`${API_VERSION}${ROUTES.AUTH}`, authRoutes);
router.use(`${API_VERSION}${ROUTES.ADMIN}`, adminRoutes);
router.use(`${API_VERSION}${ROUTES.USER}`, userRoutes);
router.use(`${API_VERSION}${ROUTES.MOVIES}`, movieRoutes);
router.use(`${API_VERSION}${ROUTES.ORDERS}`, orderRoutes);


module.exports = router;
