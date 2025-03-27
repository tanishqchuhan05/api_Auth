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

  getUsers: async () => {
    try {
      const response = await axiosInstance.get(URLS.ADMIN.USERS);
      return response.data.data; // Assuming `data` contains users
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch users";
    }
  },

  updateUser: async (userId, userData) => {
    try {
      await axiosInstance.patch(
        URLS.ADMIN.EDIT_USER(userId), //Correct way to call the function
        userData
      );
      return "User updated successfully";
    } catch (error) {
      throw error.response?.data?.message || "Failed to update user";
    }
  },

  deleteUser: async (userId) => {
    try {
      await axiosInstance.delete(
        URLS.ADMIN.DELETE_USER(userId),{
          status: "inactive",
        });
      return "User status update successfully";
    } catch (error) {
      throw error.response?.data?.message || "Failed to delete user";
    }
  },
};

export default userService;
