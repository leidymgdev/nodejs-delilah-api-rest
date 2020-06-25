const router = require("express").Router();
const Users = require("../repository/models/Users");
const { create } = require("../middlewares/users");

router.get("/", async (req, res) => {
  res.send("Home users");
});

router.post("/", async (req, res) => {
  const result = await create(req.body);
  if (result.status != 200) {
    res.status(result.status).json(result.error);
  } else {
    res.json(result.result);
  }
});

module.exports = router;
