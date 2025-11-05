const express = require("express");
const premiumRouter = express.Router();
const {
  processPayment,
  getPaymentStatus,
} = require("../Controller/paymentController");
const { jwtAuth } = require("../auth/jwt");

// paymentRouter.get("/", jwtAuth, getPaymentPage);
premiumRouter.post("/pay", jwtAuth, processPayment);
premiumRouter.get("/payment-status/:orderId", jwtAuth, getPaymentStatus);

module.exports = premiumRouter;
