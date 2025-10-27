const express = require("express");
const app = express();

const PORT = 3000;

const productRouter = require("./Routes/productRouter");

// for the products route
app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log("Server is ruunig on port 3000");
});
