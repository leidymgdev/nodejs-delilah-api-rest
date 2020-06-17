const Sequelize = require("sequelize");

const database = new Sequelize("delilahrestoelena", "root", "Intel135", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = database;
