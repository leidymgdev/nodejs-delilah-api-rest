const router = require("express").Router();
const {
  validateToken,
  validateAdminPermissions
} = require("../middlewares/users.middleware");
const { validateRequest } = require("../middlewares/products.middleware");

const controller = require("../controller/products.controller");

router.post(
  "/",
  validateRequest,
  validateToken,
  validateAdminPermissions,
  (req, res) => {
    controller.create(req, res);
  }
);

router.get("/", validateToken, (req, res) => {
  controller.read(req, res);
});

router.put(
  "/:id",
  validateRequest,
  validateToken,
  validateAdminPermissions,
  (req, res) => {
    controller.update(req, res);
  }
);

router.delete("/:id", validateToken, validateAdminPermissions, (req, res) => {
  controller.remove(req, res);
});

module.exports = router;
