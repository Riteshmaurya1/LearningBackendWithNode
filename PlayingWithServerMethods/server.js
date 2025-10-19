// get http
const http = require("http");

// fs for reading html file
const fs = require("fs");

// Port no.
let PORT = 3000;

// create a server
let server = http.createServer((req, res) => {
  // Route 1
  if (req.url == "/about" && req.method == "GET") {
    res.writeHead(201, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        name: "ritesh",
        phone: "9517424951",
        email: "Ritesh@gem.com",
      })
    );
    return;
  }

  //   Route 2
  if (req.url == "/profile" && req.method == "POST") {
    res.end("Profile Page");
    return;
  }

  //   Route 3
  if (req.url == "/login" && req.method == "GET") {
    // server side renfering
    fs.readFile("./index.html", "utf-8", (err, data) => {
      res.end(data);
    });
    return;
  }

  //   Route 4 FOr the post for the body
  if (req.url == "/sendData" && req.method == "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      console.log(body);
      res.end("Data Recieved..");
    });
  }

  //   Home Route
  res.end("this is Home Route");
});

// headers, status code -> headers -> Meta data ->

// status Code -> 200 - ok, 201 - created, 202, 404 - Not found, 501 - Server crashed.

// Listen the port
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
