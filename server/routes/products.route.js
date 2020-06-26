const router = require("express").Router();
const { validateToken } = require("../middlewares/users.middleware");
const { create, read, update, remove } = require("../logic/products.logic");

router.post("/", validateToken, async (req, res) => {
  create(req, res);
});

module.exports = router;
