const express = require("express");
const cors = require("cors");

const { PORT, ENVIRONMENT } = require("./config");

const database = require("./repository/database");
const router = require("./routes/index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`API running on port ${PORT} in environment ${ENVIRONMENT}`);

  // Syncronize database for creating the models if not exits
  database
    .sync({ force: false })
    .then(() => {
      console.log("Database is synced.");
    })
    .catch((err) => {
      throw err;
    });
});
