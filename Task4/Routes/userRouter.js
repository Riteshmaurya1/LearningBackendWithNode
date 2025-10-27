const express = require("express");
const userRouter = express.Router();

const {
  getAllUser,
  getUserById,
  createUser,
} = require("../Controller/userController");

userRouter.get("/", getAllUser);
userRouter.post("/", createUser);
userRouter.get("/:id", getUserById);

module.exports = userRouter;