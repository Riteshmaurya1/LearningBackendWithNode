const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db-connection");

const Attendance = sequelize.define("attendance", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  // student name
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  // mark
  status: {
    type: DataTypes.ENUM("present", "absent"),
    allowNull: false,
  },
  // FK column
  records_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Attendance;
