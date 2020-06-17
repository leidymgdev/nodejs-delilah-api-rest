const router = require("express").Router();

router.get("/", async (req, res) => {
  res.send("Home products");
});

module.exports = router;
