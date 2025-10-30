const Student = require("../Models/student");
const Courses = require("../Models/course");

const addCourses = async (req, res) => {
  try {
    const { name } = req.body;
    const course = await Courses.create({ name: name });
    res.status(201).json({
      data: course,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
      success: false,
    });
  }
};

const addStudentsToCourses = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const student = await Student.findByPk(studentId);
    const course = await Courses.findAll({
      where: {
        id: courseId,
      },
    });

    await student.addCourses(course);

    const updatedStudent = await Student.findByPk(studentId, {
      include: course,
    });

    res.status(201).json({
      data: updatedStudent,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
      success: false,
    });
  }
};

module.exports = {
  addCourses,
  addStudentsToCourses,
};
