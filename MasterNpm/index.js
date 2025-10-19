// Making a server with http;

const http = require("http");

let server = http.createServer(function (req, res) {
    if(req.url == '/profile' && req.method=="GET"){
        res.end("This is ritesh maurya");
        return;
    }
    if(req.url == '/address' && req.method == "POST"){
        res.end("Nighasan Lakhimpur-Kheri");
        return;
    }
  res.end("Hello World!...");
});

server.listen(3000, function () {
  console.log(`Server is running on port 3000`);
});