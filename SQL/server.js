const express = require("express");
const app = express();
const db = require("./utils/db-connection");
const studentRouter = require("./Routes/studentRouter");
const courseRouter = require("./Routes/courseRouter");

// adding student table
require("./Models");

// middleware for json data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is home page");
});

app.use("/students", studentRouter);
app.use("/courses", courseRouter);

db.sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is listing on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
