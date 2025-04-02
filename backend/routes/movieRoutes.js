const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

// Routes
// router.post("/add", movieController.addMovie);
router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);
// router.delete("/:id", movieController.deleteMovie);

module.exports = router;
