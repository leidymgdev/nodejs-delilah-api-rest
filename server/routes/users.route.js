const router = require("express").Router();
const {
  validateRequestCreate,
  validateRequestLogin,
} = require("../middlewares/users.middleware");
const { create, login } = require("../logic/users.logic");

router.post("/", validateRequestCreate, (req, res) => {
  create(req, res);
});

router.post("/login", validateRequestLogin, (req, res) => {
  login(req, res);
});

module.exports = router;
