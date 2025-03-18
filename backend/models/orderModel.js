const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
            required: true,
        },
        movieTitle: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
            unique: true, // Prevent duplicate transactions
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "refunded"],
            default: "confirmed", // Since payment is successful
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
