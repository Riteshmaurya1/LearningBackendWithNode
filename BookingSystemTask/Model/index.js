const Users = require("./users");
const Bookings = require("./bookings");
const Bus = require("./buses");

// one to many
// (A user can make multiple bookings.)
// Modify the Bookings table to store which user made the booking.
// User.hasMany(Booking)
// Booking.belongsTo(User)
// Insert sample bookings with user IDs.

Users.hasMany(Bookings, { foreignKey: { name: "userId", allowNull: false } });
Bookings.belongsTo(Users, { foreignKey: { name: "userId", allowNull: false } });

// one to many
// A bus can have multiple bookings.
// Modify the Bookings table to store which bus was booked.
// Bus.hasMany(Booking)
// Booking.belongsTo(Bus)
// Insert sample bookings with bus IDs.
Bus.hasMany(Bookings, { foreignKey: { name: "busId", allowNull: false } });
Bookings.belongsTo(Bus, { foreignKey: { name: "busId", allowNull: false } });

module.exports = {
  Users,
  Bookings,
  Bus,
};
