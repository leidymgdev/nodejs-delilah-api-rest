const router = require("express").Router();

const { validateCreate, validateLogin } = require("../middlewares/users");

router.post("/", validateCreate, (req, res) => {
  return null;
});

router.post("/login", validateLogin, (req, res) => {
  return null;
});

module.exports = router;
