import React, { useEffect, useState } from "react";
import userService from "../../Services/userService";
import { showToast } from "../../components/Toast";
import SweetAlert from "../../components/SweetAlert";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userList = await userService.getUsers();
      setUsers(userList);
      showToast("Users fetched successfully", "success");
    } catch (error) {
      showToast("Error fetching users", "error");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = async (user) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    const result = await SweetAlert.confirm(
      `Are you sure you want to ${newStatus === "active" ? "activate" : "deactivate"} this user?`,
      "This action can be reverted later."
    );
    
    if (result.isConfirmed) {
      try {
        await userService.deleteUser(user._id);
        showToast(`User ${newStatus === "active" ? "activated" : "deactivated"} successfully`);
        fetchUsers();
      } catch (error) {
        showToast("Failed to update user status", "error");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await userService.updateUser(selectedUser._id, selectedUser);
      showToast("User updated successfully");
      fetchUsers();
      document.getElementById("closeModalButton").click();
    } catch (error) {
      showToast("Failed to update user", "error");
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
              <th>Status</th>
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
                    <button
                      className="btn btn-warning btn-sm me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#editUserModal"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className={`btn btn-sm ${user.status === "active" ? "btn-danger" : "btn-success"}`}
                      onClick={() => handleDelete(user)}
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                  <td>
                    <span className={`badge ${user.status === "active" ? "bg-success" : "bg-secondary"}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
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
