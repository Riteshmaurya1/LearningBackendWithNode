const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Config/db-connection");

const Bookings = sequelize.define("Bookings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Bookings;
