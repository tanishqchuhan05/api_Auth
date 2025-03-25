const Movie = require("../models/movieModel");

// ✅ Get All Movies
const getAllMovies = async () => {
    return await Movie.find();
};

// ✅ Add a New Movie
const addMovie = async (movieData) => {
    const newMovie = new Movie(movieData);
    return await newMovie.save();
};

// ✅ Delete a Movie
const deleteMovie = async (id) => {
    return await Movie.findByIdAndDelete(id);
};

module.exports = {
    getAllMovies,
    addMovie,
    deleteMovie
};
