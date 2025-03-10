const User = require("../models/userModel");
const Order = require("../models/orderModel"); // ✅ Make sure you import the Order model
const APIResponse = require("../utilities/APIResponse");

const getDashboardStats = async (req, res) => {
    try {
        // Count total users
        const totalUser = await User.countDocuments();

        // Count total orders
        const totalOrder = await Order.countDocuments();

        // Calculate total revenue from orders
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        return APIResponse.success(res, {
            status: 200,
            message: "Admin dashboard stats retrieved",
            data: {
                totalUser,
                totalOrder,
                totalRevenue: totalRevenue[0]?.total || 0 // ✅ Fix typo: "totla" → "total"
            }
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error); // ✅ Log the actual error
        return APIResponse.error(res, {
            status: 500,
            message: "Failed to load dashboard stats",
            error: error.message // ✅ Include error details
        });
    }
};

module.exports = { getDashboardStats };
