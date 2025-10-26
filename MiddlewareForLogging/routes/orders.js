const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Here is the list of all orders.");
});
router.post("/", (req, res) => {
  res.send("A new category has been created.");
});

module.exports = router;
