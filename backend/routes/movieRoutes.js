const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const Movie = require("../models/movieModel");

// Add a new movie with an image upload
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, price, releaseDate, description, category } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imagePath) {
      return res.status(400).json({ error: "Image is required" });
    }

    const newMovie = new Movie({
      title,
      price,
      releaseDate,
      description,
      category,
      image: imagePath,
    });

    await newMovie.save();
    res.status(201).json({ message: "Movie added successfully!", movie: newMovie });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Get a single movie by ID (Fixes your issue)
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

module.exports = router;
