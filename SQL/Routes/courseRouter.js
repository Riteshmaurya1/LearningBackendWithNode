const express = require("express");
const courseRouter = express.Router();
const courseController = require("../Controller/courseController");

courseRouter.post("/addcourses", courseController.addCourses);
courseRouter.get("/addStudentCourses", courseController.addStudentsToCourses);

module.exports = courseRouter;
