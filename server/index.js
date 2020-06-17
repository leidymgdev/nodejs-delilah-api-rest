const express = require("express");
const router = require("./routes/index");
const cors = require("cors");
const { PORT, ENVIRONMENT } = require("./config");

require("./repository/database");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`API running on port ${PORT} in environment ${ENVIRONMENT}`);
});
