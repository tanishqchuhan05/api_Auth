import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",  // Corrected to match API field
    email: "",
    role: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Function to fetch the user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User is not logged in.");
        return;
      }

      const response = await axios.get("http://localhost:7001/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Profile Data:", response.data);
      setUser({
        username: response.data.data.username,  // Corrected field
        email: response.data.data.email,
        role: response.data.data.role,
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error.response?.data || error);
    }
  };

  // Handle changes to the username input field
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      username: e.target.value, // Corrected field name
    }));
  };

  // Handle saving the profile changes
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:7001/api/users/profile/update",
        { username: user.username }, // Send updated username
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update state with the latest name
      setUser((prev) => ({
        ...prev,
        username: response.data.data.username, // Set updated username
      }));

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error.response?.data || error);
      alert("Failed to update profile.");
    }
  };

  return (
    <>
      <Navbar /> {/* Assuming you have a Navbar component */}
      
      <div className="container mt-5">
        <h2 className="text-center mb-4">👤 My Profile</h2>
        <div className="card shadow-lg p-4">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="username" // Changed to match API response
              value={user.username}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={user.email}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              value={user.role}
              disabled
            />
          </div>

          <div className="text-center">
            {!isEditing ? (
              <button className="btn btn-primary me-2" onClick={() => setIsEditing(true)}>
                ✏️ Edit Name
              </button>
            ) : (
              <>
                <button className="btn btn-success me-2" onClick={handleSave}>
                  💾 Save
                </button>
                <button className="btn btn-danger" onClick={() => setIsEditing(false)}>
                  ❌ Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
