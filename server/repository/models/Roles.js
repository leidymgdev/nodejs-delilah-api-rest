const Sequelize = require("sequelize");
const database = require("../database");

const Roles = database.define("roles", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: Sequelize.STRING,
    require: true,
    allowNull: false,
    validate: { notEmpty: true }
  }
});

module.exports = Roles;
