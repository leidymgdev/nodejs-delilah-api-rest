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
  },
  timezone: "-05:00"
});

module.exports = database;

// Associations
const Statuses = require("./models/Statuses");
const Roles = require("./models/Roles");
const PaymentMethods = require("./models/PaymentMethods");
const Users = require("./models/Users");
const Products = require("./models/Products");
const Orders = require("./models/Orders");
const OrderDetails = require("./models/OrderDetails");

Roles.hasMany(Users, { foreignKey: { allowNull: false } });
Users.belongsTo(Roles);

Users.hasMany(Orders, { foreignKey: { allowNull: false } });
Orders.belongsTo(Users);

Statuses.hasMany(Orders, {
  foreignKey: { allowNull: false }
});
Orders.belongsTo(Statuses);

PaymentMethods.hasMany(Orders, {
  foreignKey: { allowNull: false, name: "paymentMethodId" }
});
Orders.belongsTo(PaymentMethods);

Orders.belongsToMany(Products, { through: OrderDetails });
Products.belongsToMany(Orders, { through: OrderDetails });
