const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const ordersRouter = require("./routes/users");

const PORT = 3000;

app.use("/orders", ordersRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
