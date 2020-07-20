const Sequelize = require("sequelize");
const database = {};

/*const database = new Sequelize("mysql://root:@localhost:3306/delilahresto");*/

const sequelize = new Sequelize("delilahresto", "root", "Intel135", {
  host: "localhost",
  dialect: "mysql",
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
