import axiosInstance from "../utils/axiosInstance";

const movieListService = {
    getAllMovies: async () => {
        try {
          const response = await axiosInstance.get("/movies");
          return response.data;
        } catch (error) {
          console.error("Error fetching movies:", error);
          throw error;
        }
      },
}

export default movieListService