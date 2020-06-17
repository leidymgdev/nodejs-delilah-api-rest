const express = require("express");
require("./database");

const app = express();
app.use(express.json());

const ordersRouter = require("./routes/orders");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

app.use("/api/orders", ordersRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

app.listen("8080", () => {
  console.log("Server started");
});
