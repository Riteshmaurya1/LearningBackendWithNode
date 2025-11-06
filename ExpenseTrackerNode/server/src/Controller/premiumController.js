const User = require("../Model/user");

// Show LeaderBoard with the help of joins.
const showLeaderBoard = async (req, res) => {
  try {
    const leaderboard = await User.findAll({
      attributes: ["username", "TotalExpenses"],
      order: [["TotalExpenses", "DESC"]],
    });
    res.status(200).json({
      data: leaderboard,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};

module.exports = { showLeaderBoard };
