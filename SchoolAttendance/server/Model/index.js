const Records = require("./records");
const Attendance = require("./attendance");

Records.hasMany(Attendance, { foreignKey: "records_id" });
Attendance.belongsTo(Records, { foreignKey: "records_id" });

module.exports = {
  Records,
  Attendance,
};
