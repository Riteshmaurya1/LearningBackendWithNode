const path = require("path");

const getProducts = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "product.html"));
};
const createProducts = (req, res) => {
  const productName = req.body;
  console.log(productName);

  return res.status(201).json(productName);
};
module.exports = { getProducts, createProducts };
