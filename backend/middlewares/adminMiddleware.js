const APIResponse = require("../utilities/APIResponse");
const JWTHandler = require("../utilities/jwtHandler");
const User = require("../models/userModel");
const MESSAGES = require("../utilities/messagesUtils");

const adminMiddleware = async (req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // ✅ Allow frontend origin
    // res.header("Access-Control-Allow-Credentials", "true"); // ✅ Allow authentication headers
    // res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    // res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

    const authToken = req.headers.authorization;
    if (!authToken) {
        return APIResponse.error(res, {
            status: 403,
            message: MESSAGES.ERROR.TOKEN_MISSING,
        });
    }

    try {
        const token = authToken.split(" ")[1];

        if (!process.env.JWT_SECRET) {
            return APIResponse.error(res, {
                status: 500,
                message: MESSAGES.ERROR.JWT_MISSING,
            });
        }

        const decoded = JWTHandler.verifyToken(token);
        req.user = decoded;

        // ✅ Fetch user from DB and check role
        const user = await User.findById(decoded.id);
        if (!user || user.role !== "superAdmin") {
            return APIResponse.error(res, {
                status: 403,
                message: MESSAGES.ERROR.UNAUTHORIZED_USER,
            });
        }

        next(); // ✅ Allow access if user is superAdmin
    } catch (error) {
        return APIResponse.error(res, {
            status: 401,
            message: MESSAGES.ERROR.INVALID_AUTH_TOKEN,
            error: error.message,
        });
    }
};

module.exports = adminMiddleware;
