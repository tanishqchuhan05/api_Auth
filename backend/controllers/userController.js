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


module.exports = {getAllUsers, editUser, deleteUser};