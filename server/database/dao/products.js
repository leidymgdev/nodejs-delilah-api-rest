const database = require("../index");

const create = async (body) => {
  return await database.sequelize.query(
    `INSERT INTO PRODUCTS (description, price) VALUES ("${body.description}", ${body.price});`,
    { type: database.sequelize.QueryTypes.INSERT }
  );
};

const findAll = async () => {
  return await database.sequelize.query(`SELECT * FROM PRODUCTS`, {
    type: database.sequelize.QueryTypes.SELECT,
  });
};

const findAllByIds = (arrayIdsProducts) => {
  return null;
  /*Products.findAll({
    where: { id: { [Op.in]: arrayIdsProducts } },
  });*/
};

const findOneById = async (id) => {
  return await database.sequelize.query(
    `SELECT * FROM PRODUCTS WHERE ID = ${id};`,
    {
      type: database.sequelize.QueryTypes.SELECT,
    }
  );
};

const update = async (id, body) => {
  return await database.sequelize.query(
    `UPDATE PRODUCTS SET DESCRIPTION = "${body.description}", PRICE = ${body.price} WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.UPDATE }
  );
};

const remove = async (id) => {
  return await database.sequelize.query(
    `DELETE FROM PRODUCTS WHERE ID = ${id};`,
    { type: database.sequelize.QueryTypes.DELETE }
  );
};

module.exports = {
  create,
  findAll,
  findAllByIds,
  findOneById,
  update,
  remove,
};
