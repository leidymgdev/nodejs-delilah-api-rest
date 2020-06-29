const OrderDetails = require("../models/OrderDetails");

const create = (body) => {
  return OrderDetails.create(body);
};

const findAll = () => {
  return OrderDetails.findAll();
};

const findAllByOrderId = (orderId) => {
  return OrderDetails.findAll({ where: { orderId } });
};

const findOne = (body) => {
  return OrderDetails.findOne({ where: { id: body.id } });
};

const update = (body) => {
  return OrderDetails.update(body, { where: { id: body.id } });
};

const remove = () => {
  return OrderDetails.destroy({ where: { id: body.id } });
};

module.exports = {
  create,
  findAll,
  findAllByOrderId,
  findOne,
  update,
  remove
};
