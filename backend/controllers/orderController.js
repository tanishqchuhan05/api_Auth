const Order = require("../models/orderModel"); 
const Movie = require("../models/movieModel"); 

const createOrder = async (req, res) => {
    try {
        const { movieId, transactionId } = req.body; // Fetch from the body
        const userId = req.user.id; // Get logged-in user's ID

        if (!movieId) {
            return res.status(400).json({ message: "Movie ID is required" });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const newOrder = new Order({
            userId,
            movieId,
            movieTitle: movie.title,
            price: movie.price,
            status: "confirmed",
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        console.error("Order creation failed:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Correctly export as an object
module.exports = { createOrder };
