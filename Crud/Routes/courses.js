const express = require("express");
const router = express.Router();

// Demo Courses
const courses = [
  { id: 1, name: "Frontend", description: "HTML, CSS, JS, React" },
  { id: 2, name: "Backend", description: "Node.js, Express, MongoDB" },
];

router.get("/", (req, res) => {
  const list = courses.map((c) => c.name).join(", ");
  res.send(`Courses: ${list}`);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find((c) => c.id === id);
  if (!course) res.send("Course not found");
  res.send(`Course: ${course.name}, Description: ${course.description}`);
});

module.exports = router;
