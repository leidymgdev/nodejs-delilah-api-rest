const { Op } = require("sequelize");
const Products = require("../models/Products");

const create = (body) => {
  return Products.create(body);
};

const findAll = () => {
  return Products.findAll({
    where: { stock: { [Op.gt]: 0 } }, // > 0
  });
};

const findOne = (body) => {
  return Products.findOne({ where: { id: body.id } });
};

const update = (body) => {
  return Products.update(body, { where: { id: body.id } });
};

const remove = () => {
  return Products.destroy({ where: { id: body.id } });
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
