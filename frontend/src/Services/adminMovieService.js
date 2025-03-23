
import axiosInstance from "../utils/axiosInstance";

const API_URL = process.env.REACT_APP_API_URL;

const adminMovieService = {
  fetchMovies: async () => {
    try {
      const response = await axiosInstance.get(API_URL + "/admin/movies");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  },

  addMovie: async (movieData) => {
    try {
      let formData = new FormData();
      console.log(formData, "formData")
      Object.keys(movieData).forEach((key) => {
        console.log(key, "==========, movieData[key]")
        formData.append(key, movieData[key]);
      });
      console.log(movieData, "movieData")
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]); 
    }
      const response = await axiosInstance.post( API_URL + "admin/addmovie", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response, "response")
      return response.data.data;
    } catch (error) {
      console.error("Error adding movie:", error);
      throw error;
    }
  },


  deleteMovie: async (movieId) => {
    try {
      const response = await axiosInstance.delete(API_URL + `admin/movies/${movieId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting movie:", error);
      throw error;
    }
  },
};

export default adminMovieService;
