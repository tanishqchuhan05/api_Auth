

const URLS = {
    API_VERSION :"/v1",
    USER: {
        REGISTER: `/auth/register`,
        LOGIN: `/auth/login`,
        PROFILE: `/profile`, 
        ORDERS: `/orders`, 
        CREATE: `/orders/create`
    },
    ADMIN: {
        DASHBOARD: `/admin/dashboard`,
        USERS: `/admin/getallusers`,  
        MOVIES: `/admin/movies`,
        ADD_MOVIE: `/admin/addmovie`,
        EDIT_USER: (id) => `/admin/updateuser/${id}`,
        DELETE_USER: (id) => `/admin/deleteuser/${id}`,
    },
    MOVIES: {
        LIST: `/movies`,
        DETAILS: (id) => `/movies/${id}`,
    }
};

export default URLS;
