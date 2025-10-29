const express = require("express");
const studentRouter = require("./Routes/studentRoutes");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("This is Home Route");
});

app.use("/students", studentRouter);

app.listen(PORT, () => {
  console.log("Server is runnugn on port 3000");
});
