import axios from "../utils/axiosInstance";

const profileService = {
    // Fetch user profile
  getUserProfile: async () => {
    try {
      const response = await axios.get("/users/profile");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user profile (only username for now)
  updateUserProfile: async (username) => {
    try {
      const response = await axios.put("/users/profile/update", { username });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout function (clears localStorage)
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  },
};


export default profileService;
