import axiosInstance from "../utils/axiosInstance";
import URLS from "../utils/urls";

const userService = {
  register: async (userData) => {
    try {
      const response = await axiosInstance.post(URLS.USER.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    }
  },

  login: async (credentials) => {
    try {
      const response = await axiosInstance.post(URLS.USER.LOGIN, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  },

  getProfile: async () => {
    try {
      const response = await axiosInstance.get(URLS.USER.PROFILE);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch profile";
    }
  },
};

export default userService;
