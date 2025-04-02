import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import UserManagement from "../pages/dashboard/Users";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import UserDashboard from "../pages/dashboard/UserDashboard";
import AdminMovies from "../pages/dashboard/AdminMovies";
import MovieDetails from "../pages/MovieDetails";
import MovieList from "../components/MovieList";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import ROLES from "./roles";

// Define an Enum for Frontend Routes (NO API URLs here)
export const APP_ROUTES = Object.freeze({
  // Public Routes
  HOME: "/",
  LOGIN: "/login",
  MOVIES: "/movies",
  MOVIE_DETAILS: "/movies/:id",

  // Admin Routes (Frontend navigation paths)
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS: "/admin/users",  
  ADMIN_MOVIES: "/admin/movies",
  ADMIN_ADD_MOVIE: "/admin/addmovie",
  EDIT_MOVIE: "/admin/updateMovie",

  // User Routes
  USER_DASHBOARD: "/user/dashboard",
  PROFILE: "/profile",
  ORDERS: "/orders",
});

const appRoutes = [
  // Public Routes
  { path: APP_ROUTES.HOME, element: <Signup />, isProtected: false },
  { path: APP_ROUTES.LOGIN, element: <Login />, isProtected: false },
  { path: APP_ROUTES.MOVIES, element: <MovieList />, isProtected: false },
  { path: APP_ROUTES.MOVIE_DETAILS, element: <MovieDetails />, isProtected: false },

  // Protected Routes for SuperAdmin
  { path: APP_ROUTES.ADMIN_DASHBOARD, element: <AdminDashboard />, isProtected: true, role: ROLES.SUPER_ADMIN },
  { path: APP_ROUTES.ADMIN_USERS, element: <UserManagement />, isProtected: true, role: ROLES.SUPER_ADMIN },
  { path: APP_ROUTES.ADMIN_MOVIES, element: <AdminMovies />, isProtected: true, role: ROLES.SUPER_ADMIN },

  // Protected Routes for Users
  { path: APP_ROUTES.USER_DASHBOARD, element: <UserDashboard />, isProtected: true, role: ROLES.USER },
  { path: APP_ROUTES.PROFILE, element: <Profile />, isProtected: true, role: ROLES.USER },
  { path: APP_ROUTES.ORDERS, element: <Orders />, isProtected: true, role: ROLES.USER },
];

export default appRoutes;
