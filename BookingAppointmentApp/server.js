const express = require("express");
const app = express();
const db = require("./utils/db-connection");
const cors = require("cors");

// Importing userRouter
const userRouter = require("./Routes/userRoutes");

// Importing db from utils
const userModel = require("./Model/user");

// use middleware for parsing json data
app.use(cors());
app.use(express.json());

// Making global Route
app.get("/", (req, res) => {
  res.send("<h1>This is Home Route</h1>");
});

app.use("/user", userRouter);

// Listioning
db.sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
