const express = require("express");
const expenseController = require("../Controller/expenseController");
const expenseRouter = express.Router();

expenseRouter.post("/add", expenseController.addExpense);
expenseRouter.get("/all", expenseController.getAllExpense);
expenseRouter.delete("/delete/:id", expenseController.deleteExpense);
expenseRouter.put("/update/:id", expenseController.editExpense);

module.exports = expenseRouter;
