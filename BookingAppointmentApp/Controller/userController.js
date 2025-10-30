const User = require("../Model/user");

const addUser = async (req, res) => {
  try {
    const { username, phoneNumber, email } = req.body;
    const user = await User.create({
      username: username,
      phoneNumber: phoneNumber,
      email: email,
    });
    res.status(201).json({
      message: `Your Appointment is booked. MR's ${username}`,
      data: user,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    // console.log(users.map((val) => console.log(val)));

    if (!users) {
      return res.status(404).json({
        message: "User not founds.",
        success: false,
      });
    }
    return res.status(200).json({
      data: users,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await User.destroy({ where: { id } });
    if (user === 0) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: `User with id ${id} deleted successfully.`,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
module.exports = {
  addUser,
  getAllUsers,
  deleteUserById,
};
