const { fn, col, Op } = require("sequelize");
const Expense = require("../Model/expense");
const User = require("../Model/user");
const makeCategory = require("../Config/gemini-category");
const sequelize = require("../Config/db-connection");

const addExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // extract the transaction from the sequelize.

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

    const expense = await Expense.create(
      {
        amount,
        description,
        category: finalCategory,
        userId,
      },
      { transaction: t }
    );

    // Update total expense for the user
    const TotalExpense = (user.totalExpenses || 0) + parseFloat(amount);

    await user.update({ totalExpenses: TotalExpense }, { transaction: t });

    // If both creating and updating successfull then commit otherwise rollback.
    await t.commit();

    res.status(201).json({
      data: expense,
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      err: error.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  const id = Number(req.params.id);
  const userId = req.payload.id;
  const t = await sequelize.transaction();

  try {
    //1. find expense amount of the task whci want to delete.
    const expenseDeleted = await Expense.findOne({
      where: { id, userId },
      transaction: t,
    });

    //2. check if task is not found then.
    if (!expenseDeleted) {
      await t.rollback();
      return res
        .status(404)
        .json({ message: "Expense not found or not authorized" });
    }

    //3. If Expense found then extract the expnese amount
    const amountToSubtract = expenseDeleted.amount;

    //4. delete the expense
    await Expense.destroy({
      where: { id, userId },
      transaction: t,
    });

    // // 5. Find the user
    // const user = await User.findOne({
    //   where: { id: userId },
    //   transaction: t,
    // });

    // // 6. get the users total expense amount and
    // // decrease the total amount in user table.
    // if (user) {
    //   user.totalExpenses -= deletedAmount;
    //   await user.save({ transaction: t });
    // }

    // 5. Use the sequelize increment method instead of getting user.totalExpnse
    await User.increment(
      { totalExpenses: -amountToSubtract },
      {
        where: { id: userId },
        transaction: t,
      }
    );

    // 6. final commit to the User Table of every thing is fine.
    await t.commit();

    res.status(200).json({
      message: "Expense deleted successfully and total amount updated",
      userId,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      message: `Something went wrong : ${error.message}`,
    });
  }
};

const allExpenses = async (req, res) => {
  const userId = req.payload.id;
  try {
    // For the pagination query from client.
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    // Count total records
    const totalItems = await Expense.count({
      where: {
        userId,
        id: {
          [Op.gt]: 0,
        },
      },
    });

    // Fetch limited data for current page
    const expenseList = await Expense.findAll({
      where: { userId },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    // Calculate pagination metadata for nextPage and prevPage
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Send response
    return res.status(200).json({
      totalItems,
      totalPages,
      currentPage: page,
      perPage: limit,
      hasPrevPage,
      hasNextPage,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? page + 1 : null,
      expenses: expenseList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

module.exports = {
  addExpense,
  deleteExpense,
  allExpenses,
};
