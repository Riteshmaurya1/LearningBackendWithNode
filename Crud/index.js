const express = require("express");
const app = express();
const studentRouter = require("./Routes/students");
const courseRouter = require("./Routes/courses");

const PORT = 3000;

app.use("/students", studentRouter);
app.use("/courses", courseRouter);

// for Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Student & Course Portal API!.");
});

// For the global Page not found
app.get(/.*/, (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log("Server is listen on port 3000");
});
