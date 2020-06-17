const express = require("express");
const router = require("../routes/index");

require("dotenv").config();
require("../repository/database");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(process.env.PORT);
  console.log("Servidor iniciado");
});
