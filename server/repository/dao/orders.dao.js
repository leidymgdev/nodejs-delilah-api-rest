const Orders = require("../models/Orders");
const OrderDetails = require("../models/OrderDetails");
const Products = require("../models/Products");

const create = (body) => {
  return Orders.create(body)
    .then((result) => result)
    .catch((err) => console.error(">> Error while creating Order: ", err));
};

const findAll = () => {
  return Orders.findAll({ include: Products })
    .then((result) => result)
    .catch((err) => console.error(">> Error while retrieving Order: ", err));
};

const findAllByUserId = (userId) => {
  return Orders.findAll({ where: { userId } })
    .then((result) => result)
    .catch((err) => console.error(">> Error while retrieving Order: ", err));
};

const findOne = (id) => {
  return Orders.findOne({ where: { id } })
    .then((result) => result)
    .catch((err) => console.log(">> Error while finding Order: ", err));
};

const findOneByUserId = (id, userId) => {
  return Orders.findOne({ where: { id, userId } })
    .then((result) => result)
    .catch((err) => console.log(">> Error while finding Order: ", err));
};

const update = (id, body) => {
  return Orders.update(body, { where: { id } })
    .then((result) => result)
    .catch((err) => console.error(">> Error while updating Order: ", err));
};

const remove = (id) => {
  return Orders.destroy({ where: { id } })
    .then((result) => result)
    .catch((err) => console.error(">> Error while removing Order: ", err));
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
