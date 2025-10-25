const http = require("http");
const route = require("./routes");
const server = http.createServer(route.normalRoutes);

// route.printName();
route.PrintFunc();
server.listen(3000, () => {
  console.log("Server is runnnig on port no 3000");
});
