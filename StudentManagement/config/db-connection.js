const mysql2 = require("mysql2");

// create my sql connection
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql@123",
  database: "studentmanagement",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected Successfully");
//   const QueryCreation = `
//     create table students(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),email VARCHAR(255) UNIQUE, age INT)`;

//   connection.execute(QueryCreation, (err) => {
//     if (err) {
//       console.log(err);
//       connection.end();
//       return;
//     }
//     console.log("Table is created!.");
//   });
});

module.exports = connection;
