const express = require("express");
require("./database");

const app = express();
app.use(express.json());

const ordersRouter = require("./routes/orders");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", usersRouter);

app.listen("8080", () => {
  console.log("Server started");
});
