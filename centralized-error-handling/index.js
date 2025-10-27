const express = require("express");
const app = express();
const PORT = 3000;

// add the routes
const userRouter = require("./Routes/userRoutes");

// middleware;
app.use(express.json());
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log("Server is lisiting on port 3000");
});
