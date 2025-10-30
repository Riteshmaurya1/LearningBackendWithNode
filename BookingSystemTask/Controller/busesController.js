const db = require("../Config/db-connection");
const Bus = require("../Model/buses");
const { Op } = require("sequelize");

const addBus = async (req, res) => {
  try {
    const { busNumber, totalSeats, availableSeats } = req.body;
    const buses = await Bus.create({
      busNumber: busNumber,
      totalSeats: totalSeats,
      availableSeats: availableSeats,
    });
    res.status(201).json({
      message: `Bus with Bus Number ${busNumber} successfully added.`,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const checkSeats = async (req, res) => {
  try {
    const seats = Number(req.params.seats);
    const bus = await Bus.findAll({
      where: {
        availableSeats: {
          [Op.gte]: seats,
        },
      },
    });
    if (bus.length === 0) {
      return res.status(404).json({
        message: `The Batch's of ${seats} are not available.`,
        status: false,
      });
    }
    res.status(200).json({
      message: bus,
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: false,
    });
  }
};

module.exports = {
  addBus,
  checkSeats,
};
