import { Navigate } from "react-router-dom";
import { APP_ROUTES } from "../utils/appRoutes"; 

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to={APP_ROUTES.LOGIN} />;
  }

  if (role && userRole !== role) {
    // Redirect users to the appropriate dashboard
    return userRole === "superAdmin" ? (
      <Navigate to={APP_ROUTES.ADMIN_DASHBOARD} />
    ) : (
      <Navigate to={APP_ROUTES.USER_DASHBOARD} />
    );
  }

  return children;
}

export default ProtectedRoute;
