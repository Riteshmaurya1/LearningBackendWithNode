const express = require("express");
const app = express();
const PORT = 3000;

app.get("/welcome/:username", (req, res) => {
  const { username } = req.params;
  const { role } = req.query;
  res.send(`Welcome ${username}, your role is ${role}`);
});
app.get("/welcome", (req, res) => {
  res.send(`This is welcome page.`);
});

app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
