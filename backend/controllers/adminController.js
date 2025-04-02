const mongoose = require("mongoose");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const APIResponse = require("../utilities/APIResponse");
const Movie = require("../models/movieModel");
const MESSAGES = require("../utilities/messagesUtils");

//Get Admin Dashboard Statistics
const getDashboardStats = async (req, res) => {
    try {
        const totalUser = await User.countDocuments({ role: { $in: ["user", "admin", "manager"] } });
        const totalOrder = await Order.countDocuments();
        const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]);
        const totalMovies = await Movie.countDocuments();

        return APIResponse.success(res, {
            status: 200,
            message: "Admin dashboard stats retrieved",
            data: {
                totalUser,
                totalOrder,
                totalRevenue: totalRevenue[0]?.total || 0,
                totalMovies
            }
        });
    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: MESSAGES.ERROR.FAILED_TO_LOAD_DASHBOARD,
            error: error.message
        });
    }
};

//Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $in: ["user", "admin", "manager"] } });

        if (users.length === 0) {
            return APIResponse.error(res, {
                status: 404,
                message: MESSAGES.ERROR.USER_NOT_FOUND,
            });
        }

        return APIResponse.success(res, {
            status: 200,
            message: MESSAGES.SUCCESS.USERS_RETRIEVED,
            data: users,
        });

    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: MESSAGES.ERROR.FAILED_FETCH_USERS,
            error: error.message,
        });
    }
};

//Edit User
const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return APIResponse.error(res, {
                status: 400,
                message: MESSAGES.ERROR.INVALID_USER_ID,
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
                message: MESSAGES.ERROR.USER_NOT_FOUND,
            });
        }

        return APIResponse.success(res, {
            status: 200,
            message: MESSAGES.SUCCESS.USER_UPDATED,
            data: updatedUser,
        });

    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: MESSAGES.ERROR.FAILED_UPDATE_USER,
            error: error.message,
        });
    }
};

//Delete User
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and update user status to inactive
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { status: "inactive" },
            { new: true }
        );

        if (!updatedUser) {
            return APIResponse.error(res, {
                status: 404,
                message: MESSAGES.ERROR.USER_NOT_FOUND,
                error: {},
            });
        }

        return APIResponse.success(res, {
            status: 200,
            message: "User status updated to inactive",
            data: updatedUser,
        });

    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: MESSAGES.ERROR.FAILED_DELETE_USER,
            error: error.message,
        });
    }
};

module.exports = { getDashboardStats, getAllUsers, editUser, deleteUser };
