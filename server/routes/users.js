const router = require("express").Router();
const Users = require("../repository/models/Users");
const { create, login } = require("../logic/users");

router.post("/create", (req, res) => {
  create(req, res);
});

router.post("/login", (req, res) => {
  login(req, res);
});

module.exports = router;
