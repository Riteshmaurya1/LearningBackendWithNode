const express = require("express");
const os = require("os");
const app = express();
// port
const PORT = 3000;

// middleware
app.use(function (req, res, next) {
  if (os.hostname == "DESKTOP-3B116UF") {
    // checking this is ritesh's laptop or not
    console.log("Yess user is verified, this is Ritesh kumar's PC");
    next();
  }
});

// make router
app.get("/", (req, res) => {
  res.send(
    `this is home route : Date - ${Date.now()} and Host Name - ${os.hostname}`
  );
});
app.get("/about", (req, res, next) => {
  res.send(`this is About route...`);
//   return next(new Error("something went wrong..."));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Please came with valid PC..!");
});
// listen router
app.listen(PORT, () => {
  console.log(`this is runing on port no ${PORT}`);
});
