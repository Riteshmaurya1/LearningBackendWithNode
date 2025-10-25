const express = require("express");
const app = express();
const PORT = 3000 || 4000;

// const customMiddleWare = (req, res, next) => {
//   req.user = "Guest";
//   next();
// };

app.get("/orders", (req, res) => {
  res.status(200).send("Here is the list of all orders.");
});
app.post("/orders", (req, res) => {
  res.status(201).send("A new order has been created.");
});
app.get("/users", (req, res) => {
  res.status(200).send("Here is the list of all users.");
});
app.post("/users", (req, res) => {
  res.status(201).send("A new user has been added.");
});

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
