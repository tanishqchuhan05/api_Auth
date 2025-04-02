import axiosInstance from "../utils/axiosInstance";
import URLS from "../utils/urls";

const movieListService = {
    getAllMovies: async () => {
        try {
          const response = await axiosInstance.get(URLS.MOVIES.LIST);
          return response.data;
        } catch (error) {
          console.error("Error fetching movies:", error);
          throw error;
        }
      },
      getMovieById: async (id) => {
        try {
          const response = await axiosInstance.get(URLS.MOVIES.DETAILS(id));
          return response.data;
        } catch (error) {
          console.error("Error fetching movie by ID:", error);
          throw error;
        }
      },
}

export default movieListService