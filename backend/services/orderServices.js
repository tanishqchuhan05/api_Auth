const Order = require("../models/orderModel");
const Movie = require("../models/movieModel");
const MESSAGES = require("../utilities/messagesUtils");

const createOrder = async (userId, movieId, transactionId, quantity) => {
    const convenienceFee = 50; // Define convenience fee

    if (!movieId) {
        throw new Error(MESSAGES.ERROR.MOVIE_ID_REQUIRED);
    }

    // Fetch movie details
    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new Error(MESSAGES.ERROR.MOVIE_NOT_FOUND);
    }

    // Calculate total amount (including convenience fee)
    const totalAmount = quantity * movie.price + convenienceFee;

    // Create a new order
    const newOrder = new Order({
        userId,
        movieId,
        quantity,
        totalAmount,
        transactionId,
        status: "confirmed",
    });

    await newOrder.save();
    return newOrder;
};

const getOrders = async (userId) => {
    return await Order.find({ userId }).populate("movieId", "title price image");
};

const getTotalRevenue = async () => {
    const totalRevenue = await Order.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
    ]);

    return totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;
};

module.exports = { createOrder, getOrders, getTotalRevenue };
