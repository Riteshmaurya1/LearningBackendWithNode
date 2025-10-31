const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db-connection");

const Records = sequelize.define("records", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Records;
