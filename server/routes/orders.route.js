const router = require("express").Router();
const {
  validateToken,
  validateAdminPermissions
} = require("../middlewares/users.middleware");
const controller = require("../controller/orders.controller");

router.post("/", validateToken, (req, res) => {
  controller.create(req, res);
});

router.get("/", validateToken, (req, res) => {
  controller.read(req, res);
});

router.get("/:id", validateToken, (req, res) => {
  controller.read(req, res);
});

router.put("/:id", validateToken, validateAdminPermissions, (req, res) => {
  controller.update(req, res);
});

router.delete(":id", validateToken, validateAdminPermissions, (req, res) => {
  controller.delete(req, res);
});

module.exports = router;
