const express = require("express");
const router = express.Router();

// Demo data
const students = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

router.get("/", (req, res) => {
  const list = students.map((s) => s.name).join(", ");
  res.send(`Students: ${list}`);
});
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) res.send("Student not found");
  res.send(`Student: ${student.name}`);
});

module.exports = router;
