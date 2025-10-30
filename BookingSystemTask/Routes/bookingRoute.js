const express = require("express");
const bookingRouter = express.Router();
const bookingController = require("../Controller/bookingController");

bookingRouter.post("/add", bookingController.addBooking);
module.exports = bookingRouter;
