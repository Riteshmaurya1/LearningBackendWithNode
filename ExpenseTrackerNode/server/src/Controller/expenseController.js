const Expense = require("../Model/expense");

const addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    if (!amount || !description || !category) {
      return res.status(401).json({
        message: "Provide all feilds.",
      });
    }
    const expense = await Expense.create({
      amount,
      description,
      category,
    });

    res.status(201).json({
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      err: err.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  const id = Number(req.params.id);

  const deleteTask = await Expense.destroy({ where: { id } });
  if (!deleteTask) {
    return res.status(404).json({
      message: "Not Found.",
    });
  }
  return res.status(200).json({
    message: "Task Deleted.",
  });
};

const allExpenses = async (req, res) => {
  const expenseList = await Expense.findAll();
  if (!expenseList) {
    return res.status(404).json({
      message: "Not Found.",
    });
  }
  return res.status(200).json({
    expenseList,
  });
};

module.exports = {
  addExpense,
  deleteExpense,
  allExpenses,
};
