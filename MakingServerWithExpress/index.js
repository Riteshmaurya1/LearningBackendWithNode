const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Home Page...");
});

app.get("/about", (req, res) => {
  res.send("Hello from About Page...");
});

// listen the port at 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
