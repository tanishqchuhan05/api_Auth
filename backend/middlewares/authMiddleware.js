const APIResponse = require("../utilities/APIResponse");
const JWTHandler = require("../utilities/jwtHandler");
const MESSAGES = require("../utilities/messagesUtils");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return APIResponse.error(res, { status: 403, message: MESSAGES.ERROR.NO_TOKEN_PROVIDED, error: {} });
    }

    const authToken = authHeader.split(" ")[1]; // ✅ Extract only the token

    try {
        const decoded = JWTHandler.verifyToken(authToken);
        if(!decoded || !decoded?.id){
            //error
        }
        req.user = decoded; // ✅ Attach user data to request object
        next(); // ✅ Proceed to next middleware
    } catch (error) {
        return APIResponse.error(res, { status: 403, message: MESSAGES.ERROR.INVALID_TOKEN, error });
    }
};

module.exports = authMiddleware;
