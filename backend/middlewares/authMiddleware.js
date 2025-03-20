const APIResponse = require("../utilities/APIResponse");
const JWTHandler = require("../utilities/jwtHandler");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return APIResponse.error(res, { status: 403, message: "Access Denied: No Token Provided", error: {} });
    }

    const authToken = authHeader.split(" ")[1]; // ✅ Extract only the token

    try {
        const decoded = JWTHandler.verifyToken(authToken);
        req.user = decoded; // ✅ Attach user data to request object
        next(); // ✅ Proceed to next middleware
    } catch (error) {
        return APIResponse.error(res, { status: 403, message: "Invalid Token", error });
    }
};

module.exports = authMiddleware;
