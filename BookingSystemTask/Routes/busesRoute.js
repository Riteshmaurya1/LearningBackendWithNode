const express = require("express");
const busesRouter = express.Router();
const busesController = require("../Controller/busesController");

busesRouter.post("/add", busesController.addBus);
busesRouter.get("/available/:seats", busesController.checkSeats);
busesRouter.get("/:id/bookings", busesController.getUserSeatsDetails);

module.exports = busesRouter;
