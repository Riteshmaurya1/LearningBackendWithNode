const express = require("express");
const userRouter = express.Router();

// Importing controller
const userController = require("../Controller/userController");

userRouter.post("/add-user", userController.addUser);
userRouter.get("/all-users", userController.getAllUsers);
userRouter.put("/update/:id", userController.getAllUsers);
userRouter.delete("/delete/:id", userController.deleteUserById);

module.exports = userRouter;
