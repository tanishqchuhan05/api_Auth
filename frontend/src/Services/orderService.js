import axiosInstance from "../utils/axiosInstance";

 const getOrders = async () => {
    try {
        const response = await axiosInstance.get("orders"); // No need to manually add token, it's handled in axiosInstance.js
        return response.data.orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};


export default  getOrders