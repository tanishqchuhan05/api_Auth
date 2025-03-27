const express = require("express");
const {register, login} = require("../controllers/authController");
const ROUTES = require("../routes/routesEnum");

const router = express.Router();

router.post(ROUTES.REGISTER, register);
router.post(ROUTES.LOGIN, login);


module.exports = router;