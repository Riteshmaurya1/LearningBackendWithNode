const getProductId = (req) => {
  let id = Number(req.params.id);
  return id;
};

module.exports = getProductId;
