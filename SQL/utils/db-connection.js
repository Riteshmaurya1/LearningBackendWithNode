const mysql = require("mysql2");

// create mysql connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql@123",
  database: "testdb",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected Successfully!.");

  // const QueryCreation = `create table Students(
  // id INT AUTO_INCREMENT PRIMARY KEY,
  // name VARCHAR(255),
  // email VARCHAR(255)
  // )`;

  // connection.execute(QueryCreation, (err) => {
  //   if (err) {
  //     console.log(err);
  //     connection.end();
  //     return;
  //   }
  //   console.log("Table is created!.");
  // });
});

module.exports = connection;
