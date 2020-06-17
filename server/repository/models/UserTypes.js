const Sequelize = require("sequelize");
const database = require("../database");

const UserTypes = database.define("usertypes", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: Sequelize.STRING,
    require: true,
    allowNull: false,
    validate: { notEmpty: true },
  },
});

module.exports = UserTypes;
