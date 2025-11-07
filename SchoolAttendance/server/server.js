const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db-connection");
require("dotenv").config();

// Making port for listioning app.
const PORT = process.env.PORT || 4000;

const attendanceRoutes = require("./Routes/attendanceRouter");
// Importing Models
require("./Model/records");
require("./Model/attendance");

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
    app.listen(PORT, () => {
      console.log(`Server is listing on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
