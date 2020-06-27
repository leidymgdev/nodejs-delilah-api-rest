const router = require("express").Router();
const {
  validateRequestCreate,
  validateRequestLogin
} = require("../middlewares/users.middleware");
const controller = require("../controller/users.controller");

router.post("/", validateRequestCreate, (req, res) => {
  controller.create(req, res);
});

router.post("/login", validateRequestLogin, (req, res) => {
  controller.login(req, res);
});

module.exports = router;
