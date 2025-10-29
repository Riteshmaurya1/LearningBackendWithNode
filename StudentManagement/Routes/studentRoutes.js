const express = require("express");
const studentRouter = express.Router();
const studentController = require("../Controller/studentController");

studentRouter.post("/", studentController.addStudent);
studentRouter.get("/", studentController.getStudents);
studentRouter.get("/:id", studentController.getStudentsById);
studentRouter.put("/:id", studentController.updateStudentData);
studentRouter.delete("/:id", studentController.deleteStudent);

module.exports = studentRouter;
