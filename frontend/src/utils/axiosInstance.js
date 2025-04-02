import axios from "axios";
import URLS from "./urls";


const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}${URLS.API_VERSION}`  ,
  headers: {
    "Content-Type": "application/json"
  },
//   withCredentials: true // Ensure cookies and authentication are sent
});



axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
