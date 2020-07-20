const database = require("../index");

const findAllOrdersWithDetails = `SELECT ORDERS.id AS id_order, ORDERS.description AS description_order, ORDERS.createdAt AS createdAt_order,
STATUSES.id AS statusId_order, STATUSES.description AS description_status,
PAYMENTMETHODS.id AS paymentmethodId, PAYMENTMETHODS.description AS description_paymentmethod,
ORDERDETAILS.quantity AS quantity_product,
PRODUCTS.ID AS productId, PRODUCTS.description AS description_product, PRODUCTS.price as price_product,
USERS.id AS userId, USERS.email AS email_user, USERS.username AS username_user, USERS.fullname AS fullname_user, USERS.cellphone AS cellphone_user, USERS.shippingAddress AS shippingAddress_user,
ROLES.id AS roleId, ROLES.description AS description_role
FROM ORDERS ORDERS
INNER JOIN STATUSES STATUSES
ON ORDERS.statusId = STATUSES.id
INNER JOIN PAYMENTMETHODS PAYMENTMETHODS
ON ORDERS.paymentmethodId = PAYMENTMETHODS.ID
INNER JOIN ORDERDETAILS ORDERDETAILS
ON ORDERS.ID = ORDERDETAILS.ORDERID
INNER JOIN PRODUCTS PRODUCTS
ON ORDERDETAILS.PRODUCTID = PRODUCTS.ID
INNER JOIN USERS USERS
ON ORDERS.userId = USERS.id
INNER JOIN ROLES ROLES
ON USERS.roleId = ROLES.id`;

const create = async (body) => {
  return await database.sequelize.query(
    `INSERT INTO ORDERS (userId, statusId, paymentmethodId) VALUES (${body.userId}, 1, ${body.paymentMethodId});`,
    { type: database.sequelize.QueryTypes.INSERT }
  );
};

const findAll = async () => {
  return await database.sequelize.query(findAllOrdersWithDetails, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

const findAllByUserId = async (userId) => {
  return await database.sequelize.query(
    `${findAllOrdersWithDetails} WHERE USERS.id = ${userId};`,
    {
      type: database.sequelize.QueryTypes.SELECT,
    }
  );
};

const findOneById = async (id) => {
  return await database.sequelize.query(
    `${findAllOrdersWithDetails} WHERE ORDERS.id = ${id};`,
    {
      type: database.sequelize.QueryTypes.SELECT,
    }
  );
};

const findOneByIdAndUserId = async (id, userId) => {
  return await database.sequelize.query(
    `${findAllOrdersWithDetails} WHERE ORDERS.id = ${id} AND  USERS.id = ${userId}`,
    {
      type: database.sequelize.QueryTypes.SELECT,
    }
  );
};

const updateStatus = async (id, statusId) => {
  return await database.sequelize.query(
    `UPDATE ORDERS SET STATUSID = ${statusId}  WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.UPDATE }
  );
};

const remove = async (id) => {
  return await database.sequelize.query(
    `DELETE FROM ORDERS WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.DELETE }
  );
};

module.exports = {
  create,
  findAll,
  findAllByUserId,
  findOneById,
  findOneByIdAndUserId,
  updateStatus,
  remove,
};
