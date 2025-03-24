const express = require("express");
const multer = require("multer");
const path = require("path");
const { 
  getDashboardStats, 
  getAllUsers, 
  editUser, 
  deleteUser,
  getAllMovies,
  addMovie,
  deleteMovie
} = require("../controllers/adminController");

const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure "uploads" folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Admin Dashboard Route
router.get("/dashboard", adminMiddleware, getDashboardStats);

// User Management Routes
router.get("/getallusers", adminMiddleware, getAllUsers);
router.patch("/updateuser/:id", adminMiddleware, editUser);
router.delete("/deleteUser/:id", adminMiddleware, deleteUser);

// ✅ Movie Management Routes
router.get("/movies", adminMiddleware, getAllMovies);       // Get all movies
// router.post("/addmovie", adminMiddleware, upload.single("poster_path"), addMovie);  // Add a new movie
router.post("/addmovie", adminMiddleware, addMovie); 
// router.put("/movies/:id", adminMiddleware, upload.single("image"), editMovie); // Edit movie
router.delete("/movies/:id", adminMiddleware, deleteMovie); // Delete movie

module.exports = router;
