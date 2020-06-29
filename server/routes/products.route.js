const router = require("express").Router();
const {
  validateToken,
  validateAdminPermissions
} = require("../middlewares/users.middleware");
const controller = require("../controller/products.controller");

router.post("/", validateToken, validateAdminPermissions, (req, res) => {
  controller.create(req, res);
});

router.get("/", validateToken, (req, res) => {
  controller.read(req, res);
});

router.put("/:id", validateToken, validateAdminPermissions, (req, res) => {
  controller.update(req, res);
});

router.delete("/:id", validateToken, validateAdminPermissions, (req, res) => {
  controller.remove(req, res);
});

module.exports = router;
