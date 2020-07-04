const Orders = require("../models/Orders");
const OrderDetails = require("../models/OrderDetails");
const Products = require("../models/Products");

const create = (body) => {
  return Orders.create(body)
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while creating Order: ${err}` }));
};

const findAll = () => {
  return Orders.findAll({
    // Make sure to include the products
    include: [
      {
        model: Products,
        as: "products",
        required: false,
        // Pass in the Product attributes that you want to retrieve
        attributes: ["id", "name"],
        through: {
          // This block of code allows you to retrieve the properties of the join table
          model: OrderDetails,
          as: "orderDetails",
          attributes: ["quantity"]
        }
      }
    ]
  })
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while retrieving Order: ${err}` }));
};

const findAllByUserId = (userId) => {
  return Orders.findAll({ where: { userId } })
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while retrieving Order: ${err}` }));
};

const findOneById = (id) => {
  return Orders.findOne({ where: { id } })
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while finding Order: ${err}` }));
};

const findOneByIdAndUserId = (id, userId) => {
  return Orders.findOne({ where: { id, userId } })
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while finding Order: ${err}` }));
};

const update = (id, body) => {
  return Orders.update(body, { where: { id } })
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while updating Order: ${err}` }));
};

const remove = (id) => {
  return Orders.destroy({ where: { id } })
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while removing Order: ${err}` }));
};

module.exports = {
  create,
  findAll,
  findAllByUserId,
  findOneById,
  findOneByIdAndUserId,
  update,
  remove
};
