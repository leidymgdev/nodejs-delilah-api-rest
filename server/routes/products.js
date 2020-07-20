const router = require("express").Router();

const { validateToken, validatePermissions } = require("../middlewares/users");

const { validateRequest } = require("../middlewares/products");

router.post(
  "/",
  validateRequest,
  validateToken,
  validatePermissions,
  (req, res) => {
    return null;
  }
);

router.get("/", validateToken, (req, res) => {
  return null;
});

router.put(
  "/:id",
  validateRequest,
  validateToken,
  validatePermissions,
  (req, res) => {
    return null;
  }
);

router.delete("/:id", validateToken, validatePermissions, (req, res) => {
  return null;
});

module.exports = router;
