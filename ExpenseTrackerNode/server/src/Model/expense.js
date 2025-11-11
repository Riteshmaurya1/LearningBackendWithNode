const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db-connection");

const Expense = sequelize.define("expense", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM("fuel", "food", "electricity", "movie", "travel"),
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Expense;
