const db = require("../Config/db-connection");
const { Bookings } = require("../Model");
const User = require("../Model/users");
const Buses = require("../Model/buses");

const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.create({
      name: name,
      email: email,
    });
    res.status(201).json({
      message: `User with name ${name} successfully added.`,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: false,
    });
  }

  // const addUserQuery = `INSERT INTO users (name,email) VALUES (?,?)`;

  // db.execute(addUserQuery, [name, email], (err) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).json({
  //       message: err.message,
  //       success: false,
  //     });
  //     db.end();
  //     return;
  //   }
  //   console.log("User has been inserted.");
  //   res.status(201).json({
  //     message: `User with name ${name} successfully added.`,
  //     success: true,
  //   });
  // });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      res.status(404).json({
        message: "No User found",
        success: false,
      });
      return;
    }
    res.status(200).json({
      message: users,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: false,
    });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }
    const bookings = await Bookings.findAll({
      where: { userId },
      attributes: ["id", "seatNumber"],
      include: [
        {
          model: Buses,
          attributes: ["busNumber"],
        },
      ],
    });

    return res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: false,
    });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserBookings,
};
