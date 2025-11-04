const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./src/Config/db-connection");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./src/Routes/userRoutes");
const expenseRouter = require("./src/Routes/expenseRoutes");
const { jwtAuth } = require("./src/auth/jwt");

const PORT = process.env.PORT;

// require Models
require("./src/Model/user");
require("./src/Model/expense");

// Middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Page");
});

// Custom routes.
app.use("/user", userRouter);
app.use("/expense", expenseRouter);

(async () => {
  try {
    await db.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
