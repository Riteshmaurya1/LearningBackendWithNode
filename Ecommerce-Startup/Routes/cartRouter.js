const express = require("express");
const cartRouter = express.Router();

cartRouter.get("/:userId ", (req, res) => {
  const id = req.params.userId;
  res.send(`Fetching cart for user with ID: ${id}`);
});
cartRouter.post("/:userId ", (req, res) => {
  const id = req.params.userId;
  res.send(`Adding product to cart for user with ID: ${id}`);
});

module.exports = cartRouter;
