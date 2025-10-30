const Student = require("./student");
const IdentityCard = require("./IdentityCard");
const Department = require("./department");
const Courses = require("./course");
const studentCourses = require("./studentCourses");

// One to One association.
Student.hasOne(IdentityCard);
IdentityCard.belongsTo(Student);

// One to many
Department.hasMany(Student);
Student.belongsTo(Department);

// Many to Many Association
Student.belongsToMany(Courses, { through: studentCourses });
Courses.belongsToMany(Student, { through: studentCourses });

module.exports = {
  Student,
  IdentityCard,
  Department,
  Courses,
  studentCourses,
};
