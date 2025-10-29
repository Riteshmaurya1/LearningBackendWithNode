const mysql = require("mysql2");

// create mysql connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql@123",
  database: "bookingsystem",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected Successfully!.");

  //   const QueryCreation = `
  //     create table Users(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),email VARCHAR(255));
  //   create table Buses(id INT AUTO_INCREMENT PRIMARY KEY,busNumber VARCHAR(255),totalSeats INT,availableSeats INT);
  //   create table Bookings(id INT AUTO_INCREMENT PRIMARY KEY,seatNumber INT);
  //   create table Payments(id INT AUTO_INCREMENT PRIMARY KEY,amountPaid INT, paymentStatus VARCHAR(255));
  //   `;

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
