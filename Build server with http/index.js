// Making a server with http;

const http = require("http");

let server = http.createServer(function (req, res) {
  if (req.url == "/home") {
    res.end("Welcome home");
    return;
  } else if (req.url == "/about") {
    res.end("Welcome to About Us");
    return;
  } else if (req.url == "/node") res.end("Welcome to my Node Js project");
  else {
    res.end("Page Not Found.");
  }
});

server.listen(3000, function () {
  console.log(`Server is running on port 3000`);
});
