const express = require ("express");
const router = express.Router();
const {getAllUsers, editUser, getUserProfile, updateUserProfile} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { deleteUser } = require("../controllers/adminController");

//Route to fetch the all users (only for admin)
router.get("/allusers",authMiddleware,getAllUsers);


//Route to edit a user (only for admin)
router.put("/updateuser/:id", adminMiddleware, editUser);

// Activate/Inactivate User (instead of deletion)
// router.put("/update-status/:id", adminMiddleware, updateUserStatus);


//Route to delete a user (only for admin)
router.delete("/deleteuser/:id", adminMiddleware, deleteUser);


router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile/update", authMiddleware, updateUserProfile);

module.exports = router;