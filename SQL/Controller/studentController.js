const db = require("../utils/db-connection");
const Student = require("../Models/student");
const addEntries = async (req, res) => {
  const { name, email } = req.body;

  try {
    const student = await Student.create({
      email: email,
      name: name,
    });
    res.status(201).json({
      message: `Student with name ${name} successfully added.`,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const student = await Student.findByPk(id);
    if (!student) {
      res.status(404).json({
        message: "User Not Found",
        status: false,
      });
    }
    student.name = name;
    student.email = email;
    await student.save();
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: false,
    });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.destroy({
      where: {
        id: id,
      },
    });
    if (!student) {
      res.status(404).json({
        message: "User is not found.",
        status: false,
      });
    }
    res.status(200).json({
      message: `User with id ${id} is deleted`,
      status: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: false,
    });
  }
};

module.exports = {
  addEntries,
  updateEntry,
  deleteEntry,
};
