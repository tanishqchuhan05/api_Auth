const API_VERSION = "/v1"; 
const baseUrl = process.env.REACT_APP_API_URL?.replace(/\/$/, "") || "http://localhost:7001/api"; 

console.log("baseUrl:", baseUrl, "API_VERSION:", API_VERSION);

const URLS = {
    USER: {
        REGISTER: `${baseUrl}${API_VERSION}/auth/register`,
        LOGIN: `${baseUrl}${API_VERSION}/auth/login`,
        PROFILE: `${baseUrl}${API_VERSION}/profile`, 
        ORDERS: `${baseUrl}${API_VERSION}/orders`, 
    },
    ADMIN: {
        DASHBOARD: `${baseUrl}${API_VERSION}/admin/dashboard`,
        USERS: `${baseUrl}${API_VERSION}/admin/getallusers`,  
        MOVIES: `${baseUrl}${API_VERSION}/admin/movies`,
        ADD_MOVIE: `${baseUrl}${API_VERSION}/admin/addmovie`,
        EDIT_USER: (id) => `${baseUrl}${API_VERSION}/admin/updateuser/${id}`,
        DELETE_USER: (id) => `${baseUrl}${API_VERSION}/admin/deleteuser/${id}`,
    },
    MOVIES: {
        LIST: `${baseUrl}${API_VERSION}/movies`,
        DETAILS: (id) => `${baseUrl}${API_VERSION}/movies/${id}`,
    }
};

export default URLS;
