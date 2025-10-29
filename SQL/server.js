const express = require("express");
const app = express();
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

  const QueryCreation = `create table Students(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20),
  email VARCHAR(20)
  )`;

  connection.execute(QueryCreation, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Table is created!.");
  });
});

app.get("/", (req, res) => {
  res.send("this is home page");
});

app.listen(3000, () => {
  console.log("Server is listing on port 3000");
});
