const Sequelize = require("sequelize");

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  TIME_ZONE
} = require("../config");

const database = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  dialectOptions: {
    useUTC: false, // For reading from database (timezone)
    dateStrings: true,
    typeCast: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
  timezone: TIME_ZONE // For writing to database
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

// Users and Roles
Roles.hasMany(Users, { foreignKey: { allowNull: false } });
Users.belongsTo(Roles, { foreignKey: { allowNull: false, defaultValue: 1 } });

// Users and Orders
Users.hasMany(Orders, { foreignKey: { allowNull: false } });
Orders.belongsTo(Users);

// Orders and Statuses
Statuses.hasMany(Orders, { foreignKey: { allowNull: false } });
Orders.belongsTo(Statuses, {
  foreignKey: { allowNull: false, defaultValue: 1 },
  as: "status"
});

// Orders and Payment Methods
PaymentMethods.hasMany(Orders, {
  foreignKey: { allowNull: false, name: "paymentMethodId" }
});
Orders.belongsTo(PaymentMethods, {
  foreignKey: { allowNull: false, defaultValue: 1 }
});

// Products and Orders
Orders.belongsToMany(Products, {
  through: OrderDetails,
  as: "products",
  foreignKey: { name: "orderId", allowNull: false },
  otherKey: { name: "productId", allowNull: false }
});
Products.belongsToMany(Orders, {
  through: OrderDetails,
  as: "orders",
  foreignKey: { name: "productId", allowNull: false },
  otherKey: { name: "orderId", allowNull: false }
});
