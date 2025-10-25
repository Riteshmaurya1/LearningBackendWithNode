const express = require("express");
const app = express();
const PORT = 3000;

app.get("/products", (req, res) => {
  res.status(200).send("Here is the list of all products.");
});
app.post("/products", (req, res) => {
  res.status(201).send("A new products has been created.");
});
app.get("/categories", (req, res) => {
  res.status(200).send("Here is the list of all categories.");
});
app.post("/categories", (req, res) => {
  res.status(201).send("A new category has been created.");
});

app.all(/.*/, (req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
