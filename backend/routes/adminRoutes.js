const express = require("express");
const {
  getDashboardStats,
  getAllUsers,
  editUser,
  deleteUser,
} = require("../controllers/adminController");

const {
  getAllMovies,
  addMovie,
  deleteMovie
} = require("../controllers/movieController");

const adminMiddleware = require("../middlewares/adminMiddleware");
const ROUTES = require("./routesEnum");

const router = express.Router();

// ✅ Admin Dashboard Route
router.get(ROUTES.ADMIN_DASHBOARD, adminMiddleware, getDashboardStats);

// ✅ User Management Routes
router.get(ROUTES.GET_ALL_USERS, adminMiddleware, getAllUsers);
router.patch(ROUTES.UPDATE_USER, adminMiddleware, editUser);
router.delete(ROUTES.DELETE_USER, adminMiddleware, deleteUser);

// ✅ Movie Management Routes
router.get(ROUTES.GET_ALL_MOVIES, adminMiddleware, getAllMovies);  // Get all movies
router.post(ROUTES.ADD_MOVIE, adminMiddleware, addMovie);  // Add a new movie
router.delete(ROUTES.DELETE_MOVIE, adminMiddleware, deleteMovie);  // Delete movie

module.exports = router;
