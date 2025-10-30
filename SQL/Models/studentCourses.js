const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const studentCourses = sequelize.define("studentCourses", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = studentCourses;
