const Sequelize = require("sequelize");
const database = require("../database");

const OrderDetail = database.define("orderdetails", {
  quantity: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    require: true,
    allowNull: false,
    validate: { notEmpty: true },
  },
  price: {
    type: Sequelize.DECIMAL,
    primaryKey: true,
    require: true,
    allowNull: false,
    validate: { notEmpty: true },
  },
});

module.exports = OrderDetail;
