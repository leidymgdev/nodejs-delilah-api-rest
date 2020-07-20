const express = require("express");
require("./database");

const app = express();
app.use(express.json());

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", ordersRouter);

app.listen("8080", () => {
  console.log("Server started");
});
