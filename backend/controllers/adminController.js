const mongoose = require("mongoose");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const APIResponse = require("../utilities/APIResponse");

// ✅ Get Admin Dashboard Statistics
const getDashboardStats = async (req, res) => {
    try {
        const totalUser = await User.countDocuments({ role: { $in: ["user", "admin", "manager"] } });
        const totalOrder = await Order.countDocuments();
        const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]);

        return APIResponse.success(res, {
            status: 200,
            message: "Admin dashboard stats retrieved",
            data: {
                totalUser,
                totalOrder,
                totalRevenue: totalRevenue[0]?.total || 0,
            }
        });
    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: "Failed to load dashboard stats",
            error: error.message
        });
    }
};

// ✅ Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $in: ["user", "admin", "manager"] } });

        if (users.length === 0) {
            return APIResponse.error(res, {
                status: 404,
                message: "No users found",
            });
        }

        return APIResponse.success(res, {
            status: 200,
            message: "All Users Retrieved Successfully",
            data: users,
        });

    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};

// ✅ Edit User
const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return APIResponse.error(res, {
                status: 400,
                message: "Invalid user ID",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, role },
            { new: true, runValidators: true, select: "-password" }
        );

        if (!updatedUser) {
            return APIResponse.error(res, {
                status: 404,
                message: "User not found",
            });
        }

        return APIResponse.success(res, {
            status: 200,
            message: "User updated successfully",
            data: updatedUser,
        });

    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: "Failed to update user",
            error: error.message,
        });
    }
};

// ✅ Delete User
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return APIResponse.error(res, {
                status: 400,
                message: "Invalid user ID",
            });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return APIResponse.error(res, {
                status: 404,
                message: "User not found",
            });
        }

        return APIResponse.success(res, {
            status: 200,
            message: "User deleted successfully",
        });

    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: "Failed to delete user",
            error: error.message,
        });
    }
};

module.exports = { getDashboardStats, getAllUsers, editUser, deleteUser };
