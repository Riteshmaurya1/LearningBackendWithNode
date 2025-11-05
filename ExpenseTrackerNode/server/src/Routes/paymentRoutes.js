const express = require("express");
const paymentRouter = express.Router();
const {
  processPayment,
  getPaymentStatus,
} = require("../Controller/paymentController");
const { jwtAuth } = require("../auth/jwt");

// paymentRouter.get("/", jwtAuth, getPaymentPage);
paymentRouter.post("/pay", jwtAuth, processPayment);
paymentRouter.get("/payment-status/:orderId", jwtAuth, getPaymentStatus);

module.exports = paymentRouter;
