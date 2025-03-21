
import axiosInstance from "../utils/axiosInstance";

const API_URL = process.env.REACT_APP_API_URL;

const adminMovieService = {
  fetchMovies: async () => {
    try {
      const response = await axiosInstance.get("admin/movies");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  },

  addMovie: async (movieData) => {
    try {
      const formData = new FormData();
      Object.keys(movieData).forEach((key) => {
        formData.append(key, movieData[key]);
      });

      const response = await axiosInstance.post("admin/addmovie", formData);
      return response.data.data;
    } catch (error) {
      console.error("Error adding movie:", error);
      throw error;
    }
  },

  deleteMovie: async (movieId) => {
    try {
      const response = await axiosInstance.delete(`admin/movies/${movieId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting movie:", error);
      throw error;
    }
  },
};

export default adminMovieService;
