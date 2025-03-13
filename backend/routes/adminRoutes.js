const express = require("express");

const { 
  getDashboardStats, 
  getAllUsers, 
  editUser, 
  deleteUser,
  getAllMovies,
  addMovie,
  editMovie,
  deleteMovie
} = require("../controllers/adminController");

const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Admin Dashboard Route
router.get("/dashboard", adminMiddleware, getDashboardStats);

// User Management Routes
router.get("/getallusers", adminMiddleware, getAllUsers);
router.patch("/updateuser/:id", adminMiddleware, editUser);
router.delete("/deleteUser/:id", adminMiddleware, deleteUser);

// ✅ Movie Management Routes
router.get("/movies", adminMiddleware, getAllMovies);       // Get all movies
router.post("/movies", adminMiddleware, addMovie);         // Add a new movie
router.put("/movies/:id", adminMiddleware, editMovie);     // Edit a movie
router.delete("/movies/:id", adminMiddleware, deleteMovie);// Delete a movie

module.exports = router;
