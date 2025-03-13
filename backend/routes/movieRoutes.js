const express = require("express");
const router = express.Router();
const Movie = require("../models/movieModel");

// Get movies based on category
router.get("/", async (req, res) => {
    try {
      const category = req.query.category;
      let movies;
  
      if (category === "now_playing") {
        movies = await Movie.find({}); // ✅ Shows all movies
      } else if (category === "latest") {
        movies = await Movie.find().sort({ releaseDate: -1 }).limit(10); // ✅ Shows the latest 10 movies
      } else if (category === "upcoming") {
        movies = await Movie.find({ upcoming: true }); // ✅ Shows only movies marked as upcoming
      } else {
        movies = await Movie.find();
      }
  
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });
  

// ✅ Add a new movie (Admin only)
router.post("/", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "Failed to add movie" });
  }
});

// ✅ Update a movie (Admin only)
router.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) return res.status(404).json({ message: "Movie not found" });

    res.json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ message: "Failed to update movie" });
  }
});

// ✅ Delete a movie (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).json({ message: "Movie not found" });

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete movie" });
  }
});

module.exports = router;
