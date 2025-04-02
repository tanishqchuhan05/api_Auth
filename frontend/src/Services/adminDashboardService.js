import { showToast } from "../components/Toast";
import axiosInstance from "../utils/axiosInstance";
import URLS from "../utils/urls";

/**
 * Fetch admin dashboard stats
 * @returns {Promise<Object>} Dashboard statistics
 */
 const getAdminDashboardStats = async () => {
  try {
    const response = await axiosInstance.get(URLS.ADMIN.DASHBOARD);
    return response.data.data;
  }  catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to fetch dashboard stats"; 
    // Show error toast
    showToast(errorMessage, "error");
    throw new Error(errorMessage);
  }
};


export default getAdminDashboardStats