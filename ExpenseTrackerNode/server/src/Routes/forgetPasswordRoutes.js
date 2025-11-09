const forgetPasswordRoutes = require("express").Router();
const forgetPassword = require("../Controller/forgetEmailController");

forgetPasswordRoutes.post("/forgotpassword", forgetPassword);

module.exports = forgetPasswordRoutes;
