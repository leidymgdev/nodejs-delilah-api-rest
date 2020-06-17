const Sequelize = require("sequelize");

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
} = require("../config");

const database = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = database;

// Associations
const Statuses = require("./models/Statuses");
const UserTypes = require("./models/UserTypes");
const PaymentMethods = require("./models/PaymentMethods");
const Users = require("./models/Users");
const Products = require("./models/Products");
const Orders = require("./models/Orders");
const OrderDetail = require("./models/OrderDetail");

Users.belongsTo(UserTypes);

Orders.belongsTo(Users);
Orders.belongsTo(Statuses);
Orders.belongsTo(PaymentMethods);

OrderDetail.belongsTo(Orders);
OrderDetail.belongsTo(Products);
