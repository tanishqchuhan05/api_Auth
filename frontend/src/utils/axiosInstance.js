import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL }/api`|| "http://localhost:7001/api/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
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
