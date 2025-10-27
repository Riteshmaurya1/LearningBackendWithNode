const express = require("express");
const app = express();
const PORT = 3000;

// add middlewares.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware for the public folder.
app.use(express.static("public"));

// Import Routes
const productRoutes = require("./routes/productRoutes");

app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log("Server is listen on port 3000");
});
