const router = require("express").Router();
const sequelize = require("sequelize");
const database = require("../database");

router.get("/", (req, res) => {
  const users = "SELECT * FROM users";
  database
    .query(users, { type: sequelize.QueryTypes.SELECT })
    .then((response) => {
      res.json(response);
    })
    .catch((e) => console.log(e));
});

router.post("/", (req, res) => {
  const { email, password, username, fullname, cellphone, shippingAddress, usertypeId } = req.body;

  const users = "INSERT INTO `users`(`email`, `password`, `username`, `fullname`, `cellphone`, `shippingAddress`,`usertypeId`) VALUES (:email, :password, :username, :fullname, :cellphone, :shippingAddress, :usertypeId)";

  database
    .query(users, { replacements: { email, password, username, fullname, cellphone, shippingAddress, usertypeId }, type: sequelize.QueryTypes.INSERT })
    .then((response) => {
      res.json(response);
    })
    .catch((e) => console.log(e));
});

module.exports = router;
