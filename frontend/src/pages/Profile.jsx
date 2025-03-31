import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import profileService from "../Services/profileService";
import SweetAlert from "../components/SweetAlert";


const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "", role: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const data = await profileService.getUserProfile(); // Correct API call
      setUser({
        username: data.data.username,
        email: data.data.email,
        role: data.data.role,
      });
    } catch (error) {
      SweetAlert.error("Error fetching profile:", error);
    }
  };

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, username: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await profileService.updateUserProfile(user.username); // Correct API call
      setIsEditing(false);
      SweetAlert.success("Profile updated successfully!");
    } catch (error) {
      SweetAlert.error("Failed to update profile.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">👤 My Profile</h2>
        <div className="card shadow-lg p-4">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={user.username}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={user.email} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <input type="text" className="form-control" value={user.role} disabled />
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
