const Orders = require("../models/Orders");

const create = (body) => {
  return Orders.create(body);
};

const findAll = () => {
  return Orders.findAll();
};

const findOne = (id) => {
  return Orders.findOne({ where: { id } });
};

const update = (id, body) => {
  return Orders.update(body, { where: { id } });
};

const remove = (id) => {
  return Orders.destroy({ where: { id } });
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove
};
