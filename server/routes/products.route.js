const router = require("express").Router();
const {
  validateToken,
  validateAdminPermissions,
} = require("../middlewares/users.middleware");
const { create, read, update, remove } = require("../logic/products.logic");

router.post("/", validateToken, validateAdminPermissions, async (req, res) => {
  create(req, res);
});

module.exports = router;
