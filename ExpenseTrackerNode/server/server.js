const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./src/Config/db-connection");

const cookieParser = require("cookie-parser");
const cors = require("cors");

// require Models for the associations
const User = require("./src/Model/user");
const Expense = require("./src/Model/expense");

const userRouter = require("./src/Routes/userRoutes");
const expenseRouter = require("./src/Routes/expenseRoutes");
const paymentRouter = require("./src/Routes/paymentRoutes");
const premiumRouter = require("./src/Routes/premiumFeatureRoutes");

const PORT = process.env.PORT;

// require Models
require("./src/Model/user");
require("./src/Model/expense");
require("./src/Model/payment");

// Associations.
User.hasMany(Expense);
Expense.belongsTo(User);

// Middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Page");
});

// Custom routes.
app.use("/user", userRouter);
app.use("/expense", expenseRouter);
app.use("/payment", paymentRouter);
app.use("/premium", premiumRouter);

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
