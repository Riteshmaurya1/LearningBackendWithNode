const express = require("express");
const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.send("Fetching all products");
});
productRouter.post("/", (req, res) => {
  res.send("Adding a new product");
});
productRouter.get("/:id", (req, res) => {
  const { id } = req.params.id;
  res.send(`Fetching product with ID: ${id}`);
});

module.exports = productRouter;
