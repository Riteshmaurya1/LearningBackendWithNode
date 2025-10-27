const path = require("path");

const getProducts = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "product.html"));
};
const createProducts = (req, res) => {
  const data = req.body;
  return res.status(201).json({ value:data.productName});
};
module.exports = { getProducts, createProducts };
