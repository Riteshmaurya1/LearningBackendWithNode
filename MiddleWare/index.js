const express = require("express");
const app = express();
const PORT = 3000 || 4000;

const customMiddleWare = (req, res, next) => {
  req.user = "Guest";
  next();
};

app.get("/welcome", customMiddleWare, (req, res) => {
  res.send(`<h1>Welcome, ${req.user}</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
