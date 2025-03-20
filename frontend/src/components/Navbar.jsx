import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Navbar = ({ onSearch }) => {
  const [adminName, setAdminName] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Search state
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("adminName");
    if (storedName) {
      setAdminName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminName");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // ✅ Pass search query to parent component
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/admindashboard">
          <img src={logo} alt="Admin Panel Logo" height="50" />
        </Link>

    

        {/* Profile Dropdown */}
        {adminName ? (
          <div className="position-relative">
            <button
              className="btn btn-light d-flex align-items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ border: "none", background: "transparent" }}
            >
              <i className="fas fa-user-circle fa-2x"></i>
              <span className="ms-2 fw-bold">{adminName}</span>
              <i className="fas fa-caret-down ms-2"></i>
            </button>

            {dropdownOpen && (
              <ul className="dropdown-menu show position-absolute end-0 mt-2 shadow" style={{ minWidth: "160px" }}>
                {/* <li>
                  <Link className="dropdown-item" to="/admin/profile">
                    <i className="fas fa-user-cog me-2"></i> Profile Settings
                  </Link>
                </li> */}
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i> Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link className="btn btn-outline-primary" to="/admin/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
