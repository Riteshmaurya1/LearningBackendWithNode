const db = require("../utils/db-connection");
const addEntries = (req, res) => {
  const { name, email } = req.body;
  const insertQuery = `INSERT INTO students (name,email) VALUES (?,?)`;

  db.execute(insertQuery, [name, email], (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
        success: false,
      });
      db.end();
      return;
    }
    console.log("Values has been inserted.");
    res.status(201).json({
      message: `Student with name ${name} successfully added.`,
      success: true,
    });
  });
};

const updateEntry = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  //   const name = "Sharpener";

  const updateQuery = `UPDATE students SET name = ?,email = ? WHERE id = ?`;

  db.execute(updateQuery, [name, email, id], (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({
        message: err.message,
        success: false,
      });
      db.end();
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({
        message: "Student not found",
        success: false,
      });
      return;
    }
    res.status(200).json({
      message: "Student is updated successfully.",
      success: true,
    });
  });
};

const deleteEntry = (req, res) => {
  const { id } = req.params;

  const deleteQuery = `DELETE FROM students WHERE id = ?`;
  db.execute(deleteQuery, [id], (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({
        message: err.message,
        success: false,
      });
      db.end();
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({
        message: "Student not found",
        success: false,
      });
    }
    res.status(200).json({
      message: `Student with ${id} is deleted.`,
      success: true,
    });
  });
};

module.exports = {
  addEntries,
  updateEntry,
  deleteEntry,
};
