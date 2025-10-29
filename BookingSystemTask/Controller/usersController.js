const db = require("../Config/db-connection");
const addUser = (req, res) => {
  const { name, email } = req.body;

  const addUserQuery = `INSERT INTO users (name,email) VALUES (?,?)`;

  db.execute(addUserQuery, [name, email], (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
        success: false,
      });
      db.end();
      return;
    }
    console.log("User has been inserted.");
    res.status(201).json({
      message: `User with name ${name} successfully added.`,
      success: true,
    });
  });
};

const getAllUsers = (req, res) => {
  const allUsers = ` SELECT * FROM users`;
  db.execute(allUsers, (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({
        message: err.message,
        success: false,
      });
      db.end();
      return;
    }
    if (!result) {
      res.status(404).json({
        message: "No User found",
        success: false,
      });
      return;
    }
    res.status(200).json({
      message: result,
      success: true,
    });
  });
};

module.exports = {
  addUser,
  getAllUsers,
};
