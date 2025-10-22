const express = require("express");
const app = express();
const path = require("path");

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/form", (req, res) => {
  let data = req.body;
  console.log(data);
});
// Dynamic route.
app.get("/profile/:user/:username", (req, res) => {
  let user = req.params.user;
  let username = req.params.username;
  console.log(user,username);
  res.send(`${user+" "+username}`);
});

app.listen(3000, () => {
  console.log("server is runing on port 3000");
});
