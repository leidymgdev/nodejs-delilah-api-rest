const Sequelize = require("sequelize");

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT
} = require("../config");

const database = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = database;

// Associations
const Statuses = require("./models/Statuses");
const UserTypes = require("./models/UserTypes");
const PaymentMethods = require("./models/PaymentMethods");
const Users = require("./models/Users");
const Products = require("./models/Products");
const Orders = require("./models/Orders");
const OrdersDetails = require("./models/OrdersDetails");

Users.belongsTo(UserTypes, {
  foreignKey: { name: "userTypeId", allowNull: false }
});

Orders.belongsTo(Users, { foreignKey: { allowNull: false } });
Orders.belongsTo(Statuses, { foreignKey: { allowNull: false } });
Orders.belongsTo(PaymentMethods, {
  foreignKey: { name: "paymentMethodId", allowNull: false }
});

OrdersDetails.belongsTo(Orders, { foreignKey: "idOrder" });
OrdersDetails.belongsTo(Products, { foreignKey: "idProduct" });
