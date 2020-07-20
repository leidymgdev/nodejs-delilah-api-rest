const database = require("../index");

const findByEmailOrUsername = async (body) => {
  return await database.sequelize.query(
    `SELECT * FROM USERS  WHERE EMAIL = "${body.email}" OR USERNAME = "${body.username}";`,
    { type: database.sequelize.QueryTypes.SELECT }
  );
};

const create = async (body) => {
  return await database.sequelize.query(
    `INSERT INTO USERS (email, password, username, fullname, cellphone, shippingAddress, roleId) 
     VALUES ("${body.email}","${body.password}","${body.username}","${body.fullname}", "${body.cellphone}", "${body.shippingAddress}", ${body.roleId});`,
    { type: database.sequelize.QueryTypes.INSERT }
  );
};

module.exports = {
  findByEmailOrUsername,
  create,
};
