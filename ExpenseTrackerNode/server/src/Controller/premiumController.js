const User = require("../Model/user");
const Expense = require("../Model/expense");
const { Sequelize } = require("sequelize");
const { fn, col } = Sequelize;

// Show LeaderBoard with the help of joins.
const showLeaderBoard = async (req, res) => {
  try {
    const leaderboard = await User.findAll({
      attributes: [
        "username",
        [fn("SUM", col("Expenses.amount")), "totalExpense"],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["User.id"],
      order: [[fn("SUM", col("Expenses.amount")), "DESC"]],
    });
    res.status(200).json({ success: true, data: leaderboard });
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};



module.exports = { showLeaderBoard };
