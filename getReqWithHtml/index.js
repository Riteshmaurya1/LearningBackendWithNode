const express = require("express");
const app = express();
const PORT = 3000;
// Import Routes
const productRoutes = require("./routes/productRoutes");

app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log("Server is listen on port 3000");
});
