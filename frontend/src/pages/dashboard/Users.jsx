import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      const response = await axiosInstance.get(API_URL + "admin/getallusers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data); // Assuming API returns users inside `data`
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle Edit Button Click
  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  // Handle Delete User
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token"); // Get token inside the function
        await axios.delete(`http://localhost:7001/api/admin/deleteuser/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("User deleted successfully");
        fetchUsers(); // Refresh users list
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      }
    }
  };

  // Handle Update User
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token inside the function
      await axios.patch(
        `http://localhost:7001/api/admin/updateuser/${selectedUser._id}`,
        selectedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User updated successfully");
      fetchUsers(); // Refresh users list
      document.getElementById("closeModalButton").click(); // Close modal
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">ALL USER'S LIST</h2>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.username.toLowerCase().includes(search.toLowerCase()))
              .map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {/* Open Modal on Click */}
                    <button
                      className="btn btn-warning btn-sm me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#editUserModal"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      <div className="modal fade" id="editUserModal" tabIndex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editUserModalLabel">Edit User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="closeModalButton" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedUser && (
                <form>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedUser.username}
                      onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={selectedUser.email} readOnly />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={selectedUser.role}
                      onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
