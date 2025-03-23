import axiosInstance from "../utils/axiosInstance";

const getMovieDetails = async (id) => {
    try {
        const response = await axiosInstance.get(`movies/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw new Error("Failed to load movie details. Please try again.");
    }
};


export default getMovieDetails
