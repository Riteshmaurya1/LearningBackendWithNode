const express = require("express");
const paymentRouter = express.Router();
const {
  processPayment,
  getPaymentStatus,
} = require("../Controller/paymentController");
const { jwtAuth } = require("../auth/jwt");

// This is for the payment for the getting premium membership.
paymentRouter.post("/pay", jwtAuth, processPayment);
paymentRouter.get("/payment-status/:orderId", jwtAuth, getPaymentStatus);

module.exports = paymentRouter;
