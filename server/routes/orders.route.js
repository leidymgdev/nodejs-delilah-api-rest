const router = require("express").Router();
const {
  validateToken,
  validateAdminPermissions
} = require("../middlewares/users.middleware");

const { validateRequest } = require("../middlewares/orders.middleware");

const controller = require("../controller/orders.controller");

router.post("/", validateRequest, validateToken, (req, res) => {
  controller.create(req, res);
});

router.get("/", validateToken, (req, res) => {
  controller.readAll(req, res);
});

router.get("/:id", validateToken, (req, res) => {
  controller.readById(req, res);
});

router.put("/:id", validateToken, validateAdminPermissions, (req, res) => {
  controller.updateStatus(req, res);
});

module.exports = router;
