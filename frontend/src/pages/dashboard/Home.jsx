import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar"; // Import Navbar
import axios from "axios";

const Home = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get("http://localhost:7001/api/admin/dashboard", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include auth token
          },
        });

        console.log("📡 API Response:", response.data); // Debugging log

        setDashboardStats(response.data.data);
      } catch (err) {
        console.error("❌ API Error:", err.response?.data?.message || err.message); // Debugging log
        setError(err.response?.data?.message || "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <>
      <Navbar /> {/* ✅ Add Navbar at the top */}
      <div className="container mt-4">
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <div className="row">
            {/* Total Users */}
            <div className="col-md-4">
              <div className="card text-bg-primary mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text fs-3">{dashboardStats?.totalUser || 0}</p>
                </div>
              </div>
            </div>

            {/* Total Orders */}
            <div className="col-md-4">
              <div className="card text-bg-success mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Orders</h5>
                  <p className="card-text fs-3">{dashboardStats?.totalOrder || 0}</p>
                </div>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="col-md-4">
              <div className="card text-bg-warning mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Revenue</h5>
                  <p className="card-text fs-3">${dashboardStats?.totalRevenue || 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
