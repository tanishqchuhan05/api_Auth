import axiosInstance from "../utils/axiosInstance";
import URLS from "../utils/urls";

 const getOrders = async () => {
    try {
        const response = await axiosInstance.get(URLS.USER.ORDERS); 
        return response.data.orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};


export default  getOrders