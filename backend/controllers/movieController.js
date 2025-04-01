const mongoose = require("mongoose");
const movieService = require("../services/movieServices");
const APIResponse = require("../utilities/APIResponse");
const MESSAGES = require("../utilities/messagesUtils");

//Get All Movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    return APIResponse.success(res, {
      status: 200,
      message: MESSAGES.SUCCESS.MOVIES_RETRIEVED,
      data: movies,
    });
  } catch (error) {
    return APIResponse.error(res, {
      status: 500,
      message: MESSAGES.ERROR.FAILED_FETCH_MOVIES,
      error: error.message,
    });
  }
};

//Add a New Movie
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
        message: MESSAGES.ERROR.IMAGE_REQUIRED,
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
      message: MESSAGES.SUCCESS.MOVIE_ADDED,
      data: newMovie,
    });
  } catch (error) {
    return APIResponse.error(res, {
      status: 500,
      message: MESSAGES.ERROR.FAILED_ADD_MOVIE,
      error: error.message,
    });
  }
};

//Delete a Movie
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return APIResponse.error(res, {
        status: 400,
        message: MESSAGES.ERROR.INVALID_MOVIE_ID,
      });
    }
    const deletedMovie = await movieService.deleteMovie(id);
    if (!deletedMovie) {
      return APIResponse.error(res, {
        status: 404,
        message: MESSAGES.ERROR.MOVIE_NOT_FOUND,
      });
    }
    return APIResponse.success(res, {
      status: 200,
      message: MESSAGES.SUCCESS.MOVIE_DELETED,
    });
  } catch (error) {
    return APIResponse.error(res, {
      status: 500,
      message: MESSAGES.ERROR.MOVIE_DELETED,
      error: error.message,
    });
  }
};

module.exports = {
  getAllMovies,
  addMovie,
  deleteMovie,
};
