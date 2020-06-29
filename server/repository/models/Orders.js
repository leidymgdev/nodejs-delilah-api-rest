const Sequelize = require("sequelize");
const database = require("../database");

const Orders = database.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: Sequelize.STRING,
    require: true,
    allowNull: true
  }
});

module.exports = Orders;
