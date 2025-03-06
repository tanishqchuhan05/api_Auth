const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Please enter a valid email address"], // Email validation
        },
        password: {
            type: String, // Removed `unique: true`
            required: true, // Added required field
        },
        role: {
            type: String,
            required: true,
            enum: ["superAdmin", "admin", "manager", "user"],
            default: "user"
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
