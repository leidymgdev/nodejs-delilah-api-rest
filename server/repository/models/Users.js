const Sequelize = require("sequelize");
const database = require("../database");

const Users = database.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    require: true,
    allowNull: false,
    validate: { notEmpty: true, isEmail: true }
  },
  password: {
    type: Sequelize.STRING,
    require: true,
    allowNull: false,
    validate: { notEmpty: true }
  },
  username: {
    type: Sequelize.STRING,
    require: true,
    allowNull: false,
    validate: { notEmpty: true }
  },
  fullname: {
    type: Sequelize.STRING,
    require: true,
    allowNull: false,
    validate: { notEmpty: true }
  },
  cellphone: {
    type: Sequelize.STRING,
    require: true,
    allowNull: false,
    validate: { notEmpty: true }
  },
  shippingAddress: {
    type: Sequelize.STRING,
    require: true,
    allowNull: false,
    validate: { notEmpty: true }
  }
});

module.exports = Users;
