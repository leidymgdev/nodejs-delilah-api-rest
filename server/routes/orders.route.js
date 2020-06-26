const router = require("express").Router();

router.get("/", async (req, res) => {
  res.send("Home orders");
});

module.exports = router;
