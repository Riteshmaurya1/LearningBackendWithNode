const express = require("express");
const cors = require("cors");
const db = require("./config/db-connection");
const expenseRouter = require("./Routes/expenseRoutes");
const app = express();

// Port
const PORT = 3000;

// Models of db
const Expense = require("./Model/expense");

// Middlewares
app.use(express.json());
app.use(cors());

// default Route
app.get("/", (req, res) => {
  res.send("<h1>This is Home Route</h1>");
});

// Routes
app.use("/expense", expenseRouter);

// Listioning App
db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listing on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
