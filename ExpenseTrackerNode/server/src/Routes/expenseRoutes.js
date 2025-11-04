const express = require("express");
const expenseRoutes = express.Router();
const { jwtAuth } = require("../auth/jwt");
const {
  addExpense,
  deleteExpense,
  allExpenses,
} = require("../Controller/expenseController");

expenseRoutes.post("/add", jwtAuth, addExpense);
expenseRoutes.delete("/delete/:id", jwtAuth, deleteExpense);
expenseRoutes.get("/all", jwtAuth, allExpenses);

module.exports = expenseRoutes;
