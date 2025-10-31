const express = require("express");
const {
  searchByDate,
  markAttendance,
  getSummary,
} = require("../Controller/attendanceController");
const attendanceRoutes = express.Router();

attendanceRoutes.post("/attendance", searchByDate);
attendanceRoutes.post("/attendance/mark", markAttendance);
attendanceRoutes.get("/attendance/summary", getSummary);

module.exports = attendanceRoutes;
