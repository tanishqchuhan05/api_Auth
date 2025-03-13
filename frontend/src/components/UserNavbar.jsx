import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Navbar = () => {
  const [userName, setUserName] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState("Select Location");
  const navigate = useNavigate();

  const popularCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune"];

  useEffect(() => {
    const storedName = localStorage.getItem("adminName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg px-4">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        
        {/* Logo (Increased Size) */}
        <Link className="navbar-brand me-4" to="/">
          <img src={logo} alt="BookMyShow Logo" height="65" /> {/* Increased Size */}
        </Link>

        {/* Search Bar */}
        <form className="d-flex flex-grow-1 mx-3" onSubmit={handleSearch} style={{ maxWidth: "500px" }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search movies..."
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-primary" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>

        {/* Location Dropdown (Reduced Space) */}
        <div className="position-relative me-2"> {/* Reduced margin-right */}
          <button
            className="btn btn-outline-primary"
            onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
          >
            <i className="fas fa-map-marker-alt"></i> {userLocation}
          </button>

          {locationDropdownOpen && (
            <ul className="dropdown-menu show position-absolute mt-2 shadow">
              {popularCities.map((city, index) => (
                <li key={index}>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setUserLocation(city);
                      setLocationDropdownOpen(false);
                    }}
                  >
                    {city}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

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
                    <Link className="dropdown-item" to="/cart">
                      <i className="fas fa-shopping-cart me-2"></i> Cart
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/my-orders">
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

export default Navbar;
