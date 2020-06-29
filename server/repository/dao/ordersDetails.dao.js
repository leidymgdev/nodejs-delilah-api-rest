const OrdersDetails = require("../models/OrdersDetails");

const create = (body) => {
  return OrdersDetails.create(body);
};

const findAll = () => {
  return OrdersDetails.findAll();
};

const findOne = (body) => {
  return OrdersDetails.findOne({ where: { id: body.id } });
};

const update = (body) => {
  return OrdersDetails.update(body, { where: { id: body.id } });
};

const remove = () => {
  return OrdersDetails.destroy({ where: { id: body.id } });
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove
};
