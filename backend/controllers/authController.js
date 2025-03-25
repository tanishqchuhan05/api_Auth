const APIResponse = require("../utilities/APIResponse");
const authService = require("../services/authServices");
const MESSAGES = require("../utilities/messagesUtils");
const PasswordHandler = require("../utilities/passwordHandler");

const register = async (req, res) => {
    console.log("Register endpoint hit"); // Debugging log
  try {
    const newUser = await authService.registerUser(req.body);

    return APIResponse.success(res, {
      status: 200,
      message: MESSAGES.SUCCESS.REGISTER,
      data: { newUser },
    });
  } catch (error) {
    return APIResponse.error(res, {
      status: 500,
      message: MESSAGES.ERROR.REGISTRATION_FAILED,
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.findUserByEmail(email);

    if (!user) {
      return APIResponse.error(res, {
        status: 404,
        message: MESSAGES.ERROR.USER_NOT_FOUND,
        error: {},
      });
    }

    const isMatch = await PasswordHandler.comparePassword(password, user.password);
    if (!isMatch) {
      return APIResponse.error(res, {
        status: 400,
        message: MESSAGES.ERROR.INVALID_CREDENTIALS,
        error: {},
      });
    }

    const token = authService.generateToken(user);

    return APIResponse.success(res, {
      status: 200,
      message: MESSAGES.SUCCESS.LOGIN,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return APIResponse.error(res, {
      status: 500,
      message: MESSAGES.ERROR.LOGIN_FAILED,
      error,
    });
  }
};

module.exports = { register, login };
