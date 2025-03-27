const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Movie = require("../models/movieModel");

// ✅ Get Dashboard Stats
const getDashboardStats = async () => {
    const totalUser = await User.countDocuments({ role: { $in: ["user", "admin", "manager"] } });
    const totalOrder = await Order.countDocuments();
    const totalMovies = await Movie.countDocuments();

    const totalRevenue = await Order.aggregate([
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    return {
        totalUser,
        totalOrder,
        totalMovies,
        totalRevenue: totalRevenue[0]?.total || 0
    };
};

// ✅ Get All Users
const getAllUsers = async () => {
    return await User.find({ role: { $in: ["user", "admin", "manager"] } });
};

// ✅ Edit User
const editUser = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, select: "-password" });
};

// ✅ Delete User
const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    editUser,
    deleteUser
};
