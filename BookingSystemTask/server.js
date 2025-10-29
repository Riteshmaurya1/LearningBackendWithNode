const express = require("express");
const app = express();
const usersRouter = require("./Routes/usersRoute");
const busesRouter = require("./Routes/busesRoute");

// Middleware for json data parsing
app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is home page");
});

app.use("/users", usersRouter);
app.use("/buses", busesRouter);

app.listen(3000, () => {
  console.log("Server is listing on port 3000");
});
