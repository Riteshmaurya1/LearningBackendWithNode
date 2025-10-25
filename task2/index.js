const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    fs.readFile("./Buffer.txt", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(`data from file:` + data.toString());
      res.write("<html>");
      res.write("<head><title>Enter Message</title></head>");
      res.write(`<body>${data.toString()}</body>`);
      res.write(
        `<body><form action="/message" method="POST"><input type="text" name="username"/> <button type="submit">Send</button></form>`
      );
      res.write("</html>");
      return res.end();
    });
  } else if (req.url == "/message") {
    res.setHeader("Content-Type", "text/html");
    let dataChunks = [];
    req.on("data", (chunks) => {
    //   console.log(chunks);
      dataChunks.push(chunks);
    });
    req.on("end", () => {
      let combinedBuffer = Buffer.concat(dataChunks);
      let splitedData = combinedBuffer.toString().split("=")[1];
      fs.writeFile("Buffer.txt", splitedData, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      });
    });
  }
});

server.listen(3000, () => {
  console.log("Server is runnnig on port no 3000");
});
