const express = require("express");
const productRoutes = express.Router();

// add product controller
const productController = require("../controller/productController");

productRoutes.get("/products",productController.getProducts);

module.exports = productRoutes;
