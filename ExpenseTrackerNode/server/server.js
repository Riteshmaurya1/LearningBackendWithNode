require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;
const db = require("./src/Config/db-connection");

const User = require("./src/Model/user");
const Expense = require("./src/Model/expense");
const ForgotPasswordRequests = require("./src/Model/forgetPassword");

const userRouter = require("./src/Routes/userRoutes");
const expenseRouter = require("./src/Routes/expenseRoutes");
const paymentRouter = require("./src/Routes/paymentRoutes");
const premiumRouter = require("./src/Routes/premiumFeatureRoutes");
const forgetPasswordRouter = require("./src/Routes/forgetPasswordRoutes");

// require Models
require("./src/Model/user");
require("./src/Model/expense");
require("./src/Model/payment");

// Associations for the user and expenses.
User.hasMany(Expense);
Expense.belongsTo(User);

// Associations for the user and ForgotPasswordRouter.
User.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(User);

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
app.use("/password", forgetPasswordRouter);

//
(async () => {
  try {
    await db.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
