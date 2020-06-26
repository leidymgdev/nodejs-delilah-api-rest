const router = require("express").Router();
const {
  validateToken,
  validateAdminPermissions,
} = require("../middlewares/users.middleware");
const { create, read, update, remove } = require("../logic/products.logic");

router.post("/", validateToken, validateAdminPermissions, (req, res) => {
  create(req, res);
});

router.get("/", validateToken, (req, res) => {
  read(req, res);
});

router.put("/", validateToken, validateAdminPermissions, (req, res) => {
  update(req, res);
});

router.delete("/", validateToken, validateAdminPermissions, (req, res) => {
  remove(req, res);
});

module.exports = router;
