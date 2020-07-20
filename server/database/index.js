const Sequelize = require("sequelize");

/*const database = new Sequelize("mysql://root:@localhost:3306/delilahresto");*/

const database = new Sequelize("delilahresto", "root", "Intel135", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = database;
