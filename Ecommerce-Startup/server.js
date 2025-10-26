const express = require("express");
const app = express();

const PORT = 3000;

const userRouter = require("./Routes/userRouter");
const productRouter = require("./Routes/productRouter");
const cartRouter = require("./Routes/cartRouter");

// for the users route
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.listen(PORT, () => {
  console.log("Server is ruunig on port 3000");
});
