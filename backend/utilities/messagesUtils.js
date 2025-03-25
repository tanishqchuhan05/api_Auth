const MESSAGES = {
  SUCCESS: {
      REGISTER: "User registered successfully",
      LOGIN: "Login successful",
      DASHBOARD_STATS: "Admin dashboard stats retrieved",
      USERS_RETRIEVED: "All users retrieved successfully",
      USER_UPDATED: "User updated successfully",
      USER_DELETED: "User deleted successfully",
      MOVIES_RETRIEVED: "Movies retrieved successfully",
      MOVIE_ADDED: "Movie added successfully",
      MOVIE_DELETED: "Movie deleted successfully",
  },
  ERROR: {
      REGISTRATION_FAILED: "Registration failed",
      LOGIN_FAILED: "Login failed",
      USER_NOT_FOUND: "User not found",
      INVALID_CREDENTIALS: "Invalid credentials",
      ACCESS_DENIED: "Access denied: No token provided",
      INVALID_TOKEN: "Invalid token",
      FAILED_FETCH_USERS: "Failed to fetch users",
      FAILED_UPDATE_USER: "Failed to update user",
      FAILED_DELETE_USER: "Failed to delete user",
      FAILED_FETCH_MOVIES: "Failed to fetch movies",
      FAILED_ADD_MOVIE: "Failed to add movie",
      FAILED_DELETE_MOVIE: "Failed to delete movie",
  },
};

module.exports = MESSAGES;
