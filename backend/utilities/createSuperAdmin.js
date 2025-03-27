const bcrypt = require('bcryptjs');
const User = require("../models/userModel");
const MESSAGES = require('./messagesUtils');
require("dotenv").config();


// SUPER_ADMIN Creation
async function createSuperAdmin() {
    try {
      const superadminExists = await User.findOne({ role: "superAdmin" });
  
      if (!superadminExists) {
        const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10); // ✅ Hash password
  
        const superadmin = new User({
          username: process.env.SUPER_ADMIN_USERNAME ,
          email: process.env.SUPER_ADMIN_EMAIL,
          password: hashedPassword, // ✅ Store hashed password
          role: "superAdmin",
        });
  
        await superadmin.save();
        
      } else {
       
      }
    } catch (error) {
      throw new Error(MESSAGES.ERROR.FAILED_CREATE_SUPERADMIN +": " + error.message);
    }
  }

module.exports = createSuperAdmin