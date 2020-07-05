const { Op } = require("sequelize");
const Products = require("../models/Products");

const create = (body) => {
  return Products.create(body);
};

const findAll = () => {
  return Products.findAll();
};

const findAllByIds = (arrayIdsProducts) => {
  return Products.findAll({
    where: { id: { [Op.in]: arrayIdsProducts } }
  });
};

const findOneById = (id) => {
  return Products.findOne({ where: { id } });
};

const update = (id, body) => {
  return Products.update(body, { where: { id } }).then(() => findOneById(id));
};

const remove = (id) => {
  return Products.destroy({ where: { id } });
};

module.exports = {
  create,
  findAll,
  findAllByIds,
  findOneById,
  update,
  remove
};
