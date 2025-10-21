const express = require("express");
const app = express();
// *******************************


// middleware
app.use(express.json());

// ***************************
// Creates Routes
app.get("/", (req, res) => {
  res.send("This is home page");
});
let todos = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Buy groceries from the market",
    completed: false,
  },
  {
    id: 2,
    title: "Complete JavaScript project",
    description: "Finish the CRUD application and test all features",
    completed: false,
  },
  {
    id: 3,
    title: "Call mechanic",
    description: "Book an appointment for the bike servicing",
    completed: true,
  },
  {
    id: 4,
    title: "Pay electricity bill",
    description: "Complete the payment before the due date",
    completed: false,
  },
  {
    id: 5,
    title: "Practice LeetCode problems",
    description: "Solve at least 3 medium-level problems today",
    completed: false,
  },
];
// Get Route
app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});
app.get("/todos/:id", (req, res) => {
  let id = Number(req.params.id);
  let todo = todos.find((todo) => todo.id === id);
  res.status(200).json(todo);
});
app.post("/todos", (req, res) => {
  let todo = req.body;
  console.log(todo);

  todos.push(todo);
  res.status(201).json(todos);
});

// **********************************
// Listing the port
app.listen(3000, () => {
  console.log("server is running");
});
