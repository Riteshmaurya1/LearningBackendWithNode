const express = require("express");
const usersRouter = express.Router();
const usersController = require("../Controller/usersController");

usersRouter.post("/add", usersController.addUser);
usersRouter.get("/allusers", usersController.getAllUsers);

module.exports = usersRouter;
