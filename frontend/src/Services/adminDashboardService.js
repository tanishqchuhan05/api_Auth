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
  } catch (error) {
    console.error("❌ Error fetching admin dashboard stats:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch dashboard stats");
  }
};


export default getAdminDashboardStats