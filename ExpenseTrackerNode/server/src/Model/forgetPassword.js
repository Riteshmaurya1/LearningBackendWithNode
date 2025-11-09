const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db-connection");

const ForgotPasswordRequests = sequelize.define("forgotpasswordrequests", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = ForgotPasswordRequests;