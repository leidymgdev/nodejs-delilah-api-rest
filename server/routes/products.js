const router = require("express").Router();
const sequelize = require("sequelize");
const database = require("../database");

router.get("/", (req, res) => {
  const products = "SELECT * FROM products";
  database
    .query(products, { type: sequelize.QueryTypes.SELECT })
    .then((response) => {
      res.json(response);
    })
    .catch((e) => console.log(e));
});

module.exports = router;
