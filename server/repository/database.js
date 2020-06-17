const Sequelize = require("sequelize");

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
} = require("../config");

const StatusesModel = require("./models/Statuses");
const UserTypesModel = require("./models/UserTypes");
const PaymentMethodsModel = require("./models/PaymentMethods");
const UsersModel = require("./models/Users");
const ProductsModel = require("./models/Products");
const OrdersModel = require("./models/Orders");
const OrderDetailModel = require("./models/OrderDetail");

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

const Statuses = StatusesModel(database, Sequelize);
const UserTypes = UserTypesModel(database, Sequelize);
const PaymentMethods = PaymentMethodsModel(database, Sequelize);
const Users = UsersModel(database, Sequelize);
const Products = ProductsModel(database, Sequelize);
const Orders = OrdersModel(database, Sequelize);
const OrderDetail = OrderDetailModel(database, Sequelize);

Users.belongsTo(UserTypes);

Orders.belongsTo(Users);
Orders.belongsTo(Statuses);
Orders.belongsTo(PaymentMethods);

OrderDetail.belongsTo(Orders);
OrderDetail.belongsTo(Products);

database
  .sync({ force: false })
  .then(() => {
    console.log("Database is synced.");
  })
  .catch((err) => {
    throw err;
  });

module.exports = {
  Statuses,
  UserTypes,
  PaymentMethods,
  Users,
  Products,
  Orders,
  OrderDetail,
};
