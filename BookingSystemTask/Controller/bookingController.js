const Users = require("../Model/users");
const Buses = require("../Model/buses");
const Bookings = require("../Model/bookings");

const addBooking = async (req, res) => {
  try {
    const { userId, busId, seatNumber } = req.body;

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ err: "User not found", success: false });
    }

    const bus = await Buses.findByPk(busId);
    if (!bus) {
      return res.status(404).json({ err: "Bus not found", success: false });
    }

    const existing = await Bookings.findOne({ where: { busId, seatNumber } });
    if (existing) {
      return res
        .status(409)
        .json({ err: "Seat already booked", success: false });
    }

    const booking = await Bookings.create({ userId, busId, seatNumber });

    const created = await Bookings.findByPk(booking.id);
    return res.status(201).json({
      data: created || booking,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      err: error,
      success: false,
    });
  }
};

module.exports = {
  addBooking,
};
