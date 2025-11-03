const express = require("express");
const { userSignUp } = require("../Controller/userController");
const userRouter = express.Router();

userRouter.post("/signup", userSignUp);

module.exports = userRouter;
