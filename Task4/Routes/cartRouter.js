const express = require("express");
const cartRouter = express.Router();

// importing the cart controller
const { addItemInCart, getCart } = require("../Controller/cartController");

cartRouter.get("/:userId ", getCart);
cartRouter.post("/:userId ", addItemInCart);

module.exports = cartRouter;
