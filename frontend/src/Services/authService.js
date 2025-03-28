import axiosInstance from "../utils/axiosInstance";
import URLS from "../utils/urls";

export const loginUser = async (values) => {
  try {
    const response = await axiosInstance.post(`${URLS.USER.LOGIN}`, values);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
