const router = require("express").Router();

const { validateToken, validatePermissions } = require("../middlewares/users");

const { validateRequest } = require("../middlewares/orders");

router.post("/", validateRequest, validateToken, (req, res) => {
  return null;
});

router.get("/", validateToken, (req, res) => {
  return null;
});

router.get("/:id", validateToken, (req, res) => {
  return null;
});

router.put("/:id", validateToken, validatePermissions, (req, res) => {
  return null;
});

router.delete("/:id", validateToken, validatePermissions, (req, res) => {
  return null;
});

module.exports = router;
