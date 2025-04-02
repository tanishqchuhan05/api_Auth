const Movie = require("../models/movieModel");

//Get All Movies
const getAllMovies = async () => {
    return await Movie.find();
};

// Get Movie by ID
const getMovieById = async (id) => {
    return await Movie.findById(id);
  };

//Add a New Movie
const addMovie = async (movieData) => {
    const newMovie = new Movie(movieData);
    return await newMovie.save();
};

// Edit (Update) a Movie
const updateMovie = async (id, updatedData) => {
    return await Movie.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
};

//Delete a Movie
const deleteMovie = async (id) => {
return await  Movie.findByIdAndUpdate(id,{isDelete:true},{new: true});
}

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    deleteMovie,
    updateMovie,
};
