const { fn, col } = require("sequelize");
const Expense = require("../Model/expense");
const User = require("../Model/user");
const makeCategory = require("../Config/gemini-category");

const addExpense = async (req, res) => {
  try {
    const userId = req.payload.id;

    const { amount, description, category } = req.body;
    if (!amount || !description) {
      return res.status(401).json({
        message: "Provide all feilds.",
      });
    }

    // Auto-generate category if missing or empty
    let finalCategory =
      category && category.trim() !== ""
        ? category
        : await makeCategory(description);
    console.log(finalCategory);

    // Find the user is present on db or not.
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const expense = await Expense.create({
      amount,
      description,
      category: finalCategory,
      userId,
    });

    // Update total expense for the user
    const TotalExpense = (user.totalExpenses || 0) + parseFloat(amount);

    await user.update({ totalExpenses: TotalExpense });

    res.status(201).json({
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  const id = Number(req.params.id);
  const userId = req.payload.id;

  // ensure ownership check
  const deleteTask = await Expense.destroy({
    where: { id, userId },
  });

  if (deleteTask === 0) {
    return res
      .status(404)
      .json({ message: "Expense not found or not authorized" });
  }

  res.status(200).json({ message: "Expense deleted successfully" });
};

const allExpenses = async (req, res) => {
  const userId = req.payload.id;
  const expenseList = await Expense.findAll({ where: { userId } });
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
