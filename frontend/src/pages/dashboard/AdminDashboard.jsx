import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import   getAdminDashboardStats  from "../../Services/adminDashboardService"; // ✅ Import centralized API function
import { APP_ROUTES } from "../../utils/appRoutes";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const stats = await getAdminDashboardStats(); // ✅ Use centralized API function
        setDashboardStats(stats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <div className="row">
            <div className="col-md-3">
              <div className="card text-bg-primary mb-3" onClick={() => navigate(APP_ROUTES.ADMIN_USERS)}>
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text fs-3">{dashboardStats?.totalUser || 0}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-bg-success mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Orders</h5>
                  <p className="card-text fs-3">{dashboardStats?.totalOrder || 0}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-bg-warning mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Revenue</h5>
                  <p className="card-text fs-3">₹{dashboardStats?.totalRevenue || 0}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-bg-info mb-3" onClick={() => navigate(APP_ROUTES.ADMIN_MOVIES)}>
                <div className="card-body">
                  <h5 className="card-title">Total Movies</h5>
                  <p className="card-text fs-3">{dashboardStats?.totalMovies || 0}</p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
