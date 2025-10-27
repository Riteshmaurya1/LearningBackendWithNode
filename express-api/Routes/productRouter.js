const express = require("express");
const productRouter = express.Router();

// Adding products Controller
const {
  getProducts,
  fetchWithId,
  addNewProduct,
} = require("../Controller/productController");

productRouter.get("/", getProducts);
productRouter.post("/", addNewProduct);
productRouter.get("/:id", fetchWithId);

module.exports = productRouter;
