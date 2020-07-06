const OrderDetails = require("../models/OrderDetails");

const create = (body) => {
  return OrderDetails.create(body);
};

const remove = (orderId) => {
  return OrderDetails.destroy({ where: { orderId } });
};

module.exports = {
  create,
  remove
};
