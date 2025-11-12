const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "studentattendance",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "Mysql@123",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Creation of database has been successfull.");
  } catch (err) {
    console.log(err);
  }
})();

module.exports = sequelize;
