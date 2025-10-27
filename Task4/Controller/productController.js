const getProducts = (req, res) => {
  res.status(200).send("Fetching all products");
};
const addNewProduct = (req, res) => {
  res.status(201).send("Adding a new product");
};

const fetchWithId = (req, res) => {
  const id = req.params.id;
  res.status(200).send(`Fetching product with ID: ${id}`);
};

module.exports = { getProducts, addNewProduct, fetchWithId };
