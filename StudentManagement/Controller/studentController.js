const db = require("../config/db-connection");
const addStudent = (req, res) => {
  const { name, email, age } = req.body;

  const addQuery = `INSERT INTO students (name,email,age) VALUES (?,?,?)`;
  db.execute(addQuery, [name, email, age], (err) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({
        message: err.message,
        status: false,
      });
      db.end();
      return;
    }
    return res.status(201).json({
      message: `Student name ${name} added successfully.`,
      status: true,
    });
  });
};
const getStudents = (req, res) => {
  const addQuery = `SELECT id,name,email,age FROM studentmanagement.students`;
  db.execute(addQuery, (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({
        message: err.message,
        status: false,
      });
      db.end();
      return;
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `User not found`,
        status: false,
      });
    }
    return res.status(201).json({
      data: result,
      status: true,
    });
  });
};
const getStudentsById = (req, res) => {
  const id = Number(req.params.id);
  const addQuery = `SELECT id,name,email,age FROM studentmanagement.students WHERE id = ?`;
  db.execute(addQuery, [id], (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({
        message: err.message,
        status: false,
      });
      db.end();
      return;
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: `User not found`,
        status: false,
      });
    }
    return res.status(201).json({
      data: result,
      status: true,
    });
  });
};
const updateStudentData = (req, res) => {
  const { name, email, age } = req.body;
  const id = Number(req.params.id);
  const updateQuery = `UPDATE students SET name = ?,email = ?,age = ? WHERE id = ?`;
  db.execute(updateQuery, [name, email, age, id], (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({
        message: err.message,
        status: false,
      });
      db.end();
      return;
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: `Student not found`,
        status: false,
      });
    }
    console.log("Student Updated Successfully!.");
  });
};
const deleteStudent = (req, res) => {
  const id = Number(req.params.id);
  const updateQuery = `DELETE FROM students WHERE id = ?`;
  db.execute(updateQuery, [id], (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({
        message: err.message,
        status: false,
      });
      db.end();
      return;
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: `Student not found`,
        status: false,
      });
    }
    console.log(`Student deleted Successfully with id ${id}`);
  });
};

module.exports = {
  addStudent,
  getStudents,
  getStudentsById,
  updateStudentData,
  deleteStudent,
};
