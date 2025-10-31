const db = require("../config/db-connection");
const Expenses = require("../Model/expense");
const addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    if (!amount || !description || !category) {
      return res.status(404).json({
        message: "Please Enter All details",
        success: false,
      });
    }
    const expenseData = await Expenses.create({
      amount: amount,
      description: description,
      category: category,
    });
    return res.status(201).json({
      data:expenseData,
      message: "Expense Added Successfully.",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
      success: false,
    });
  }
};

const getAllExpense = async (req, res) => {
  try {
    const allData = await Expenses.findAll({
      attributes: ["id","amount", "description", "category"],
    });
    if (!allData) {
      return res.status(404).json({
        message: "Expense list Empty",
        success: false,
      });
    }
    return res.status(200).json(allData);
  } catch (err) {
    res.status(500).json({
      err: err.message,
      success: false,
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const expenseId = await Expenses.destroy({ where: { id } });
    if (!expenseId) {
      return res.status(404).json({
        message: "Expense is not exits",
        success: false,
      });
    }
    return res.status(200).json({
      message: `Expense with id ${id} is deleted successfully`,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
      success: false,
    });
  }
};

const editExpense = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { amount, description, category } = req.body;

    const expense = await Expenses.findByPk(id);
    if (!expense) {
      return res.status(404).json({
        message: "Expense is not exits",
        success: false,
      });
    }
    const data = await expense.update({ amount, description, category });

    return res.status(200).json({
      data,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
      success: false,
    });
  }
};
module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
  editExpense,
};
