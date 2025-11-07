const express = require("express");
const attendanceRoutes = express.Router();
const {
  searchByDate,
  markAttendance,
  getSummary,
} = require("../Controller/attendanceController");

attendanceRoutes.post("/attendance", searchByDate);
attendanceRoutes.post("/attendance/mark", markAttendance);
attendanceRoutes.get("/attendance/summary", getSummary);

module.exports = attendanceRoutes;