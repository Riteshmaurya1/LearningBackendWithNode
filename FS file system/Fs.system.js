const fs = require("fs");

fs.readFile("./sampleData.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// var data="I am Coder";
// fs.writeFile("./newData.txt", `${data}`, (err) => {
//   if (err) throw err;
// });

// var data = "\nI Love Coding 👨‍💻❤";
// fs.appendFile("./newData.txt", `${data}`, (err) => {
//   if (err) throw err;
// });
