const database = require("../index");

const create = async (body) => {
  return await database.sequelize.query(
    `INSERT INTO ORDERDETAILS (quantity, orderId, productId) VALUES (${body.quantity}, ${body.orderId}, ${body.productId});`,
    { type: database.sequelize.QueryTypes.INSERT }
  );
};

const remove = async (orderId) => {
  return await database.sequelize.query(
    `DELETE FROM ORDERDETAILS WHERE ORDERID = ${orderId};`,
    { type: database.sequelize.QueryTypes.DELETE }
  );
};

module.exports = {
  create,
  remove,
};
