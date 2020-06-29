const Orders = require("../models/Orders");

const create = (body) => {
  return Orders.create(body);
};

const findAll = () => {
  return Orders.findAll();
};

const findAllByUserId = (userId) => {
  return Orders.findOne({ where: { userId } });
};

const findOne = (id) => {
  return Orders.findOne({ where: { id } });
};

const findOneByUserId = (id, userId) => {
  return Orders.findOne({ where: { id, userId } });
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
  findAllByUserId,
  findOne,
  findOneByUserId,
  update,
  remove
};
