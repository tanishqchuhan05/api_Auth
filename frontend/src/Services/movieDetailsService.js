import movieListService from "../Services/movieListService";  // Import the centralized service

const getMovieDetails = async (id) => {
    try {
        // Call the centralized service method to get movie details
        const movieData = await movieListService.getMovieById(id);
        return movieData?.data;
    } catch (error) {
        console.error("Error fetching movie details:", error.response ? error.response.data : error.message);
        throw new Error("Failed to load movie details. Please try again.");
    }
};

export default getMovieDetails;
