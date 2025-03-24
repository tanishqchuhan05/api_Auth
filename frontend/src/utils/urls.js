const baseUrl = process.env.REACT_APP_API_URL
console.log("baseUrl", baseUrl,process.env)
const URLS = {
    USER: {
        REGISTER: `${baseUrl}auth/register`,
        LOGIN: `${baseUrl}auth/login`,
        PROFILE: `${baseUrl}profile`, // Aligned with APP_ROUTES.PROFILE
        ORDERS: `${baseUrl}orders`, // Aligned with APP_ROUTES.ORDERS
    },
    ADMIN: {
        DASHBOARD: `${baseUrl}admin/dashboard`, // Aligned with APP_ROUTES.ADMIN_DASHBOARD
        USERS: `${baseUrl}admin/getalluser`, // Aligned with APP_ROUTES.ADMIN_USERS
        MOVIES: `${baseUrl}admin/movies`, // Aligned with APP_ROUTES.ADMIN_MOVIES
    },
    MOVIES: {
        LIST: `${baseUrl}movies`, // Aligned with APP_ROUTES.MOVIES
        DETAILS: (id) => `${baseUrl}movies/${id}`, // Aligned with APP_ROUTES.MOVIE_DETAILS
    }
}
export default URLS;