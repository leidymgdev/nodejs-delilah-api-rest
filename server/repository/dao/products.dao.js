const { Op } = require("sequelize");
const Products = require("../models/Products");

const create = (body) => {
  return Products.create(body)
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while creating Product: ${err}` }));
};

const findAll = () => {
  return Products.findAll()
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while retrieving Products: ${err}` }));
};

const findOneById = (id) => {
  return Products.findOne({ where: { id } })
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while finding Product: ${err}` }));
};

const update = (id, body) => {
  return Products.update(body, { where: { id } })
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while updating Product: ${err}` }));
};

const remove = (id) => {
  return Products.destroy({ where: { id } })
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while removing Product: ${err}` }));
};

module.exports = {
  create,
  findAll,
  findOneById,
  update,
  remove
};
