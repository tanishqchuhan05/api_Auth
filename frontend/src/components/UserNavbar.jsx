import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { APP_ROUTES } from "../utils/appRoutes";

const UserNavbar = ({ onSearch }) => {
  const [userName, setUserName] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("adminName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    navigate(APP_ROUTES.LOGIN);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Send query to MovieList component
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg px-4">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        
        {/* Logo */}
        <Link className="navbar-brand me-4" to="/">
          <img src={logo} alt="BookMyShow Logo" height="65" />
        </Link>

        {/* Search Bar */}
        <form className="d-flex flex-grow-1 mx-3" style={{ maxWidth: "500px" }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search movies..."
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange} // Trigger search on typing
          />
        </form>

        {/* Profile Dropdown */}
        <div className="position-relative">
          <button
            className="btn btn-light d-flex align-items-center"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            style={{ border: "none", background: "transparent" }}
          >
            <i className="fas fa-user-circle fa-2x"></i>
            <span className="ms-2 fw-bold">{userName || "Guest"}</span>
            <i className="fas fa-caret-down ms-2"></i>
          </button>

          {profileDropdownOpen && (
            <ul className="dropdown-menu show position-absolute end-0 mt-2 shadow">
              {userName ? (
                <>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="fas fa-user-cog me-2"></i> Profile Settings
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/orders">
                      <i className="fas fa-receipt me-2"></i> My Orders
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link className="dropdown-item" to="/login">
                    <i className="fas fa-sign-in-alt me-2"></i> Login
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;