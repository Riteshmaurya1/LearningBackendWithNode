const express = require("express");
const expenseRoutes = express.Router();
const {
  addExpense,
  deleteExpense,
  allExpenses,
} = require("../Controller/expenseController");

expenseRoutes.post("/add", addExpense);
expenseRoutes.delete("/delete/:id", deleteExpense);
expenseRoutes.get("/all", allExpenses);

module.exports = expenseRoutes;
