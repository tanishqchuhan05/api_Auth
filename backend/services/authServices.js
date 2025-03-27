const User = require("../models/userModel");
const PasswordHandler = require("../utilities/passwordHandler");
const JWTHandler = require("../utilities/jwtHandler");

const registerUser = async ({ username, email, password, role }) => {
  try {
    role = role || "user"; // Default role as 'user'
    const hashedPassword = await PasswordHandler.hashPassword(password);

    // Create and return new user
    return await User.create({ username, email, password: hashedPassword, role });
  } catch (error) {
    throw error; // Let the controller handle the response
  }
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const generateToken = (user) => {
  return JWTHandler.generateToken(user);
};

module.exports = { registerUser, findUserByEmail, generateToken };
