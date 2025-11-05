// models/Payment.js
const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db-connection");

const Payment = sequelize.define("Payment", {
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentSessionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  orderCurrency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "INR",
  },
  paymentStatus: {
    type: DataTypes.ENUM("pending", "success", "failed"),
    defaultValue: "pending",
  },
});

module.exports = Payment;
