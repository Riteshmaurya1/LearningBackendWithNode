const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("studentattendance", "root", "Mysql@123", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Creation of database has been successfull.");
  } catch (err) {
    console.log(err);
  }
})();

module.exports = sequelize;
