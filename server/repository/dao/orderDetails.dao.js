const OrderDetails = require("../models/OrderDetails");

const create = (body) => {
  return OrderDetails.create(body)
    .then((result) => result)
    .catch((err) => ({
      error: `>> Error while creating Order Detail: ${err}`
    }));
};

const findAll = () => {
  return OrderDetails.findAll()
    .then((result) => result)
    .catch((err) => ({
      error: `>> Error while retrieving Order Details: ${err}`
    }));
};

const findAllByOrderId = (orderId) => {
  return OrderDetails.findAll({ where: { orderId } })
    .then((result) => result)
    .catch((err) => ({
      error: `>> Error while retrieving Order Details: ${err}`
    }));
};

const findOneById = (id) => {
  return OrderDetails.findOne({ where: { id } })
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while finding Order Detail: ${err}` }));
};

const update = (body) => {
  return OrderDetails.update(body, { where: { id: body.id } })
    .then((result) => result)
    .catch((err) => ({
      error: `>> Error while updating Order Detail: ${err}`
    }));
};

const remove = (id) => {
  return OrderDetails.destroy({ where: { id } })
    .then((result) => result)
    .catch((err) => ({
      error: `>> Error while removing Order Detail: ${err}`
    }));
};

module.exports = {
  create,
  findAll,
  findAllByOrderId,
  findOneById,
  update,
  remove
};
