import axiosInstance from "../utils/axiosInstance";
import { APP_ROUTES } from "../utils/appRoutes"; 
const userNavbarService = {
    getUserProfile: async () => {
        try {
            const response = await axiosInstance.get("/profile");
            return response.data;
        } catch (error) {
            console.error("Error fetching user profile:", error);
            throw error;
        }
    },
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        window.location.href = APP_ROUTES.LOGIN; // Using defined route
    },
};

export default userNavbarService;
