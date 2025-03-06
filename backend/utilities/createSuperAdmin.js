const bcrypt = require('bcryptjs');
const User = require("../models/userModel");
require("dotenv").config();


// SUPER_ADMIN Creation
async function createSuperAdmin() {
    try {
      const superadminExists = await User.findOne({ role: "superAdmin" });
  
      if (!superadminExists) {
        const hashedPassword = await bcrypt.hash("SuperAdmin@123", 10); // ✅ Hash password
  
        const superadmin = new User({
          username: "SuperAdmin",
          email: "superAdmin@gmail.com",
          password: hashedPassword, // ✅ Store hashed password
          role: "superAdmin",
        });
  
        await superadmin.save();
        console.log("✅ SuperAdmin created successfully!");
      } else {
        console.log("⚡ SuperAdmin already exists.");
      }
    } catch (error) {
      console.error("❌ Error creating superAdmin:", error);
    }
  }

module.exports = createSuperAdmin