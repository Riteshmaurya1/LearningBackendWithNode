const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.setHeader("Content-Type", "text/html");
    res.end(`
            <form action='/message' method="POST">
            <label>Name:</label>
            <input type="text" name="username"/>
            <button type="submit">Add</button>
            </form>
            `);
  } else {
    if (req.url == "/message") {
      res.setHeader("Content-Type", "text/html");
      let dataChunks = [];
      req.on("data", (chunks) => {
        console.log(chunks);
        dataChunks.push(chunks);
      });
      req.on("end", () => {
        let combinedBuffer = Buffer.concat(dataChunks);
        let splitedData = combinedBuffer.toString().split("=")[1];
        fs.writeFile("BufferData.txt", splitedData, (err) => {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        });
      });
    } else {
      if (req.url == "/read") {
        fs.readFile("BufferData.txt", (err, data) => {
          res.end(`<h1>${data.toString()}</h1>`);
        });
      }
    }
  }
});

server.listen(3000, () => {
  console.log("Server is runnnig on port no 3000");
});
