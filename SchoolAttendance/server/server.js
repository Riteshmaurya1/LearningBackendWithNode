const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db-connection");
const attendanceRoutes = require("./Routes/attendanceRouter");

// Importing Models
const studentRecords = require("./Model/records");
const attendanceRecords = require("./Model/attendance");

// Middleware for json data parsing
app.use(express.json());
app.use(cors());

// default route
app.get("/", (req, res) => {
  res.send("this is home page");
});

// custom routes
app.use("/student", attendanceRoutes);

db.sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is listing on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
