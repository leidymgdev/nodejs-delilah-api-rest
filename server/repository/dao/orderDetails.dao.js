const OrderDetails = require("../models/OrderDetails");

const create = (body) => {
  return OrderDetails.create(body)
    .then((result) => result)
    .catch((err) =>
      console.error(">> Error while creating Order Detail: ", err)
    );
};

const findAll = () => {
  return OrderDetails.findAll()
    .then((result) => result)
    .catch((err) =>
      console.error(">> Error while retrieving Order Details: ", err)
    );
};

const findAllByOrderId = (orderId) => {
  return OrderDetails.findAll({ where: { orderId } })
    .then((result) => result)
    .catch((err) =>
      console.error(">> Error while retrieving Order Details: ", err)
    );
};

const findOne = (body) => {
  return OrderDetails.findOne({ where: { id: body.id } })
    .then((result) => result)
    .catch((err) => console.log(">> Error while finding Order Detail: ", err));
};

const update = (body) => {
  return OrderDetails.update(body, { where: { id: body.id } })
    .then((result) => result)
    .catch((err) =>
      console.error(">> Error while updating Order Detail: ", err)
    );
};

const remove = () => {
  return OrderDetails.destroy({ where: { id: body.id } })
    .then((result) => result)
    .catch((err) =>
      console.error(">> Error while removing Order Detail: ", err)
    );
};

module.exports = {
  create,
  findAll,
  findAllByOrderId,
  findOne,
  update,
  remove
};
