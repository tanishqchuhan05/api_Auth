
import axiosInstance from "../utils/axiosInstance";
import appRoutes, { APP_ROUTES } from "../utils/appRoutes";

// const API_URL = process.env.REACT_APP_API_URL;

const adminMovieService = {
  fetchMovies: async () => {
    try {
      const response = await axiosInstance.get(APP_ROUTES.ADMIN_MOVIES);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  },

  // addMovie: async (movieData) => {
  //   try {
  //     let formData = new FormData();
  //     console.log(formData, "formData")
  //     Object.keys(movieData).forEach((key) => {
  //       console.log(key, "==========, movieData[key]")
  //       formData.append(key, movieData[key]);
  //     });
  //     console.log(movieData, "movieData")
  //     for (let pair of formData.entries()) {
  //       console.log(pair[0] + ": ", pair[1]); 
  //   }
  //     const response = await axiosInstance.post( API_URL + "admin/addmovie", formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log(response, "response")
  //     return response.data.data;
  //   } catch (error) {
  //     console.error("Error adding movie:", error);
  //     throw error;
  //   }
  // },
  addMovie: async (movieData) => {
    try {
        const response = await axiosInstance.post(APP_ROUTES.ADMIN_ADD_MOVIE, movieData);

        console.log(response, "response");
        return response.data.data;
    } catch (error) {
        console.error("Error adding movie:", error);
        throw error;
    }
},



  deleteMovie: async (movieId) => {
    try {
      const response = await axiosInstance.delete(`${APP_ROUTES.ADMIN_MOVIES}/${movieId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting movie:", error);
      throw error;
    }
  },
};

export default adminMovieService;
