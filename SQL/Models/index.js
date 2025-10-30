const Student = require("./student");
const IdentityCard = require("./IdentityCard");
const Department = require("./department");

// One to One association.
Student.hasOne(IdentityCard);
IdentityCard.belongsTo(Student);

// One to many
Department.hasMany(Student);
Student.belongsTo(Department);

module.exports = {
  Student,
  IdentityCard,
  Department,
};
