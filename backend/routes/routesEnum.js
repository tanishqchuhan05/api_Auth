

const ROUTE_ENUMS = {
    // Base Routes
    AUTH: "/auth",
    ADMIN: "/admin",
    USER: "/user",
    MOVIES: "/movies",
    ORDERS: "/orders",
  
    // Authentication
    LOGIN: "/login",
    REGISTER: "/register",
  
    // User Management
    USERS: "/users",
    USER_BY_ID: "/user/:id",
  
    // Movie Management
    ALL_MOVIES: "/allmovies",
    GET_MOVIE: "/getmovie/:id",
    BOOK_TICKET: "/bookticket/:movieId",
    UPDATE_PAYMENT: "/updatepayment/:orderId",
    GET_USER_ORDERS: "/getUserOrder",
  
    // Admin Dashboard
    ADMIN_DASHBOARD: "/dashboard",
  
    // Admin - User Management
    ADMIN_USERS: "/adminusers",
    ADMIN_GET_USER: "/getuser/:_id",
    ADMIN_EDIT_USER: "/edituser/:_id",
    ADMIN_DELETE_USER: "/deleteuser/:_id",
    GET_ALL_USERS: "/getallusers",
    UPDATE_USER: "/updateuser/:id",
    DELETE_USER: "/deleteUser/:id",
  
    // Admin - Movie Management
    ADD_MOVIE: "/addmovie",
    GET_ALL_MOVIES: "/movies",
    ADMIN_GET_MOVIE: "/getMovie/:_id",
    DELETE_MOVIE: "/movies/:id",
    UPDATE_MOVIE: "/movie/:_id",
  };
  
  module.exports = ROUTE_ENUMS;
  