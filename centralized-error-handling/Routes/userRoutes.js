const express = require("express");
const userRouter = express.Router();

// importing controllers
const userController = require("../Controller/userController");

userRouter.get("/:id", userController.getUser);
userRouter.post("/", userController.createUser);

module.exports = userRouter;
