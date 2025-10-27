const getCart = (req, res) => {
  const id = req.params.userId;
  res.status(200).send(`Fetching cart for user with ID: ${id}`);
};
const addItemInCart = (req, res) => {
  const id = req.params.userId;
  res.status(201).send(`Adding product to cart for user with ID: ${id}`);
};

module.exports = { getCart, addItemInCart };
