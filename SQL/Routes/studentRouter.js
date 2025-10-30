const express = require("express");
const studentRouter = express.Router();
const studentController = require("../Controller/studentController");

studentRouter.post("/add", studentController.addEntries);
studentRouter.put("/update/:id", studentController.updateEntry);
studentRouter.delete("/delete/:id", studentController.deleteEntry);
studentRouter.post(
  "/studentWithCard",
  studentController.addingValuesToIdentityCardAndStudentTable
);

module.exports = studentRouter;
