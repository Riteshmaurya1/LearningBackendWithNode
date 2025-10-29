const db = require("../Config/db-connection");
const addBus = (req, res) => {
  const { busNumber, totalSeats, availableSeats } = req.body;

  const addUserQuery = `INSERT INTO buses (busNumber,totalSeats,availableSeats) VALUES (?,?,?)`;

  db.execute(addUserQuery, [busNumber, totalSeats, availableSeats], (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
        success: false,
      });
      db.end();
      return;
    }
    console.log("Bus has been added.");
    res.status(201).json({
      message: `Bus with Bus Number ${busNumber} successfully added.`,
      success: true,
    });
  });
};

const checkSeats = (req, res) => {
  const seats = Number(req.params.seats);
  const SeatsQuery = `SELECT id, busNumber, totalSeats, availableSeats FROM Buses WHERE availableSeats >= ? ORDER BY availableSeats DESC`;

  db.execute(SeatsQuery,[seats],(err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
        success: false,
      });
      db.end();
      return;
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: "All Seats are full",
        success: false,
      });
    }
    res.status(200).json({
      result,
      success: true,
    });
  });
};

module.exports = {
  addBus,
  checkSeats,
};
