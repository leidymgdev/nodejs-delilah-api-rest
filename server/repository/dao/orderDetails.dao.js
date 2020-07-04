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

const findOneById = (id) => {
  return OrderDetails.findOne({ where: { id } });
};

const update = (body) => {
  return OrderDetails.update(body, { where: { id: body.id } });
};

const remove = (id) => {
  return OrderDetails.destroy({ where: { id } });
};

module.exports = {
  create,
  findAll,
  findAllByOrderId,
  findOneById,
  update,
  remove
};
