const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expensetracker", "root", "Mysql@123", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Creation of database has been created.");
  } catch (err) {
    console.log(err);
  }
})();

module.exports = sequelize;
