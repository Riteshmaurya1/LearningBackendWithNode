const express = require("express");
const premiumRouter = express.Router();
const {
  processPayment,
  getPaymentStatus,
  showLeaderBoard,
} = require("../Controller/paymentController");
const { jwtAuth } = require("../auth/jwt");

// paymentRouter.get("/", jwtAuth, getPaymentPage);
premiumRouter.post("/pay", jwtAuth, processPayment);
premiumRouter.get("/payment-status/:orderId", jwtAuth, getPaymentStatus);
premiumRouter.get("/leaderboard", jwtAuth, showLeaderBoard);

module.exports = premiumRouter;
