const express = require("express");
const app = express();
const usersRouter = require("./Routes/usersRoute");
const busesRouter = require("./Routes/busesRoute");
const bookingRouter = require("./Routes/bookingRoute");
const db = require("./Config/db-connection");

// Importing Models
const userModel = require("./Model/users");
const paymentsModel = require("./Model/payments");
const busesModel = require("./Model/buses");
const bookingsModel = require("./Model/bookings");

// Middleware for json data parsing
app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is home page");
});

app.use("/users", usersRouter);
app.use("/buses", busesRouter);
app.use("/bookings", bookingRouter);

db.sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is listing on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
