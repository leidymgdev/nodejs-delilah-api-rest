const { Op } = require("sequelize");
const Products = require("../models/Products");

const create = (body) => {
  return Products.create(body);
};

const findAll = () => {
  return Products.findAll();
};

const findOne = (id) => {
  return Products.findOne({ where: { id } });
};

const update = (id, body) => {
  return Products.update(body, { where: { id: body.id } });
};

const remove = (id) => {
  return Products.destroy({ where: { id } });
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove
};
