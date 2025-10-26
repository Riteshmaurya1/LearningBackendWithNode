const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Fetching all users");
});
userRouter.post("/", (req, res) => {
  res.send("Adding a new user");
});
userRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Fetching user with ID: ${id}`);
});

module.exports = userRouter;
