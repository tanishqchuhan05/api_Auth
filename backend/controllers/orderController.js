const Order = require ("../models/orderModel")
const Movie = require("../models/movieModel")

const createOrder = async (req, res) => {
    try {
        const { movieId, transactionId, quantity } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        const userId = req.user.id;
        const convenienceFee = 50; // ✅ Define convenience fee

        if (!movieId) {
            return res.status(400).json({ message: "Movie ID is required" });
        }

        console.log("Fetching movie details for movieId:", movieId);
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // ✅ Correct calculation of total amount (including convenience fee)
        const totalAmount = (quantity * movie.price) + convenienceFee;

        console.log("Calculated totalAmount:", totalAmount, "Movie Price:", movie.price, "Quantity:", quantity);

        const newOrder = new Order({
            userId,
            movieId,
            quantity,
            totalAmount,  // ✅ Only store totalAmount
            transactionId,
            status: "confirmed",
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });

    } catch (error) {
        console.error("Order creation failed:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};





const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id })
            .populate("movieId", "title price image");

        console.log("Fetched Orders: ", orders); // ✅ Debug log

        res.status(200).json({
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getTotalRevenue = async (req, res) => {
    try {
        // Sum up totalAmount from all orders
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
        ]);

        res.status(200).json({
            message: "Total revenue fetched successfully",
            totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0,
        });
    } catch (error) {
        console.error("Error fetching total revenue:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// ✅ Correctly export as an object
module.exports = { createOrder,getOrders, getTotalRevenue };
