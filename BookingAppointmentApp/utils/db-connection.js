const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("bookingappointment", "root", "Mysql@123", {
  host: "localhost",
  dialect: "mysql",
});

async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.log(err);
  }
};

module.exports = sequelize;
