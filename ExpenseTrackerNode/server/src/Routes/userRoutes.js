const express = require("express");
const { userSignUp, login } = require("../Controller/userController");
const userRouter = express.Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/login", login);

module.exports = userRouter;
