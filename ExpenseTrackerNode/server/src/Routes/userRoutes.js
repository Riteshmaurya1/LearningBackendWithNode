const express = require("express");
const { userSignUp, login, profile } = require("../Controller/userController");
const { jwtAuth } = require("../auth/jwt");
const userRouter = express.Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/login", login);
userRouter.get("/profile", jwtAuth, profile);

module.exports = userRouter;
