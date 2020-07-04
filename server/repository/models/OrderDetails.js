const Sequelize = require("sequelize");
const database = require("../database");

const Orders = require("./Orders");
const Products = require("./Products");

const OrderDetails = database.define("orderDetails", {
  orderId: {
    type: Sequelize.INTEGER,
    require: true,
    allowNull: false,
    validate: { notEmpty: true },
    references: {
      model: Orders,
      key: "id"
    }
  },
  productId: {
    type: Sequelize.INTEGER,
    require: true,
    allowNull: false,
    validate: { notEmpty: true },
    references: {
      model: Products,
      key: "id"
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    require: true,
    allowNull: false,
    validate: { notEmpty: true }
  },
  price: {
    type: Sequelize.DECIMAL,
    require: true,
    allowNull: true
  }
});

module.exports = OrderDetails;
