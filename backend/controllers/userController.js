const APIResponse = require("../utilities/APIResponse");
const User = require("../models/userModel");

//controller to fetch all user (only for admin)
const getAllUsers = async (req, res) =>{
    try{
        const users = await User.find({role: "user"});
        return APIResponse.success(res, {
            status: 200,
            message: "User retrieved successfully",
            data: users
        });
    }catch(error){
        return APIResponse.error(res,{
            status: 500,
            message: "Failed to fetch users",
            error: error.message
        });
    }
};


const editUser = async (req, res) =>{
    try{
        const {id} = req.params;
        const {username, email, role} = req.body;

        //find and update the user
        const updatedUser = await User.findByIdAndUpdate(id, {username, email, role}, {new: true, runValidators: true});

        if(!updatedUser){
            return APIResponse.error(res,{
                status: 404,
                message: "User not found",
                error: {}
            });
        }
            return APIResponse.success(res,{
                status:200,
                message: "User Update Successfully",
                data: updatedUser
            });

     }catch(error){
        return APIResponse.error(res,{
            status: 500,
            message: "Failed to update user",
            error: error.message
        });

     }
};


//Delete User (Admin Only)

const deleteUser = async (req, res) =>{
    try{
        const {id} = req.params;

        //find and delete user
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser){
            return APIResponse.error(res,{
                status: 404,
                message: "User not found",
                error: {}
            });
        }

        return APIResponse.success(res,{
            status: 200,
            message: "User deleted successfully"
        });

    }catch(error){
        return APIResponse.error(res,{
            status: 500,
            message: "Failed to delete user",
            error: error.message
        });

    }
};




const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("username email role");

        if (!user) {
            return APIResponse.error(res, {
                status: 404,
                message: "User not found",
                error: {}
            });
        }

        return APIResponse.success(res, {
            status: 200,
            message: "Profile retrieved successfully",
            data: user
        });

    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: "Server error",
            error: error.message
        });
    }
};

  
const updateUserProfile = async (req, res) => {
    try {
        const { username } = req.body; // Get username from request
        const userId = req.user.id; // Assuming user ID is extracted from token

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username }, // Update username in DB
            { new: true, select: "email role username" } // Ensure updated username is returned
        );

        res.status(200).json({
            status: 200,
            message: "Profile updated successfully",
            data: {
                username: updatedUser.username, // Now included
                email: updatedUser.email,
                role: updatedUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



module.exports = {getAllUsers, editUser, deleteUser, getUserProfile, updateUserProfile};