const express = require("express");
const app = express();
const booksRouter = require("./Routes/books");


const PORT = 3000;
app.use("/books", booksRouter);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
