const forgetPasswordRoutes = require("express").Router();
const {
  forgetPassword,
  resetPassword,
  updatePassword,
} = require("../Controller/forgetEmailController");

forgetPasswordRoutes.post("/forgotpassword", forgetPassword);
forgetPasswordRoutes.get("/resetpassword/:uuid", resetPassword);
forgetPasswordRoutes.post("/updatepassword", updatePassword);

module.exports = forgetPasswordRoutes;
