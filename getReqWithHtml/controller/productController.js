const path = require("path");

const getProducts = (req, res) => {
    res.sendFile(path.join(__dirname,'..','view','product.html'))
};
module.exports = { getProducts };
