const mongoose = require("mongoose");
const movieService = require("../services/movieServices");
const APIResponse = require("../utilities/APIResponse");

// ✅ Get All Movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    return APIResponse.success(res, {
      status: 200,
      message: "Movies retrieved successfully",
      data: movies,
    });
  } catch (error) {
    return APIResponse.error(res, {
      status: 500,
      message: "Failed to fetch movies",
      error: error.message,
    });
  }
};

// ✅ Add a New Movie
const addMovie = async (req, res) => {
  try {
    const {
      title,
      price,
      releaseDate,
      description,
      genre,
      category,
      isUpcoming,
      imageURL,
    } = req.body;
    if (!imageURL) {
      return APIResponse.error(res, {
        status: 400,
        message: "Image URL is required",
      });
    }
    const newMovie = await movieService.addMovie({
      title,
      price,
      releaseDate,
      description,
      genre,
      category,
      isUpcoming,
      image: imageURL,
    });
    return APIResponse.success(res, {
      status: 201,
      message: "Movie added successfully",
      data: newMovie,
    });
  } catch (error) {
    return APIResponse.error(res, {
      status: 500,
      message: "Failed to add movie",
      error: error.message,
    });
  }
};

// ✅ Delete a Movie
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return APIResponse.error(res, {
        status: 400,
        message: "Invalid movie ID",
      });
    }
    const deletedMovie = await movieService.deleteMovie(id);
    if (!deletedMovie) {
      return APIResponse.error(res, {
        status: 404,
        message: "Movie not found",
      });
    }
    return APIResponse.success(res, {
      status: 200,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    return APIResponse.error(res, {
      status: 500,
      message: "Failed to delete movie",
      error: error.message,
    });
  }
};

module.exports = {
  getAllMovies,
  addMovie,
  deleteMovie,
};
