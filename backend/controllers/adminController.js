const mongoose = require("mongoose");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const APIResponse = require("../utilities/APIResponse");
const Movie = require("../models/movieModel");

// ✅ Get Admin Dashboard Statistics
const getDashboardStats = async (req, res) => {
    try {
        // Count total users
        const totalUser = await User.countDocuments({ role: { $in: ["user", "admin", "manager"] } });

        // Count total orders
        const totalOrder = await Order.countDocuments();

        // Count total movies
        const totalMovies = await Movie.countDocuments();

        // Calculate total revenue
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);



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
            message: "Failed to load dashboard stats",
            error: error.message
        });
    }
};

// ✅ Get All Users (Excluding Admins & Managers)
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

// ✅ Edit User Details
const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role } = req.body;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return APIResponse.error(res, {
                status: 400,
                message: "Invalid user ID",
            });
        }

        // Update User
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

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return APIResponse.error(res, {
                status: 400,
                message: "Invalid user ID",
            });
        }

        // Find and delete user
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


// ✅ Get All Movies
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        
        return APIResponse.success(res, {
            status: 200,
            message: "Movies retrieved successfully",
            data: movies,
        });
    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: "Failed to fetch movies",
            error: error.message,
        });
    }
};

// ✅ Add a New Movie
const addMovie = async (req, res) => {
    try {
        const { title, price, releaseDate, description, genre, category, isUpcoming } = req.body;

        // Ensure an image was uploaded
        if (!req.file) {
            return APIResponse.error(res, {
                status: 400,
                message: "Image file is required",
            });
        }

        const image = `/uploads/${req.file.filename}`; // Save file path

        const newMovie = new Movie({
            title,
            genre,
            releaseDate,
            description,
            category,
            image: image, // Save the uploaded image path
            price,
            isUpcoming: isUpcoming || false, // Defaults to false
        });

        await newMovie.save();

        return APIResponse.success(res, {
            status: 201,
            message: "Movie added successfully",
            data: newMovie,
        });
    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: "Failed to add movie",
            error: error.message,
        });
    }
};


// // ✅ Edit a Movie
// const editMovie = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, genre, releaseDate, duration, poster, isUpcoming } = req.body;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return APIResponse.error(res, {
//                 status: 400,
//                 message: "Invalid movie ID",
//             });
//         }

//         const updatedMovie = await Movie.findByIdAndUpdate(
//             id,
//             { title, genre, releaseDate, duration, poster, isUpcoming },
//             { new: true, runValidators: true }
//         );

//         if (!updatedMovie) {
//             return APIResponse.error(res, {
//                 status: 404,
//                 message: "Movie not found",
//             });
//         }

//         return APIResponse.success(res, {
//             status: 200,
//             message: "Movie updated successfully",
//             data: updatedMovie,
//         });

//     } catch (error) {
//         return APIResponse.error(res, {
//             status: 500,
//             message: "Failed to update movie",
//             error: error.message,
//         });
//     }
// };

// ✅ Delete a Movie
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return APIResponse.error(res, {
                status: 400,
                message: "Invalid movie ID",
            });
        }

        const deletedMovie = await Movie.findByIdAndDelete(id);

        if (!deletedMovie) {
            return APIResponse.error(res, {
                status: 404,
                message: "Movie not found",
            });
        }

        return APIResponse.success(res, {
            status: 200,
            message: "Movie deleted successfully",
        });

    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: "Failed to delete movie",
            error: error.message,
        });
    }
};


module.exports = { getDashboardStats, getAllUsers, editUser, deleteUser, getAllMovies,addMovie, deleteMovie };
