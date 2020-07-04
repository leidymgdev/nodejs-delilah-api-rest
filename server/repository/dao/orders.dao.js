const Orders = require("../models/Orders");
const OrderDetails = require("../models/OrderDetails");
const Products = require("../models/Products");

const create = (body) => {
  return Orders.create(body);
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
        attributes: ["id", "name", "price"],
        through: {
          // This block of code allows you to retrieve the properties of the join table
          model: OrderDetails,
          as: "orderDetails",
          attributes: ["quantity"],
        },
      },
    ],
  });
};

const findAllByUserId = (userId) => {
  return Orders.findAll({ where: { userId } });
};

const findOneById = (id) => {
  return Orders.findOne({ where: { id } });
};

const findOneByIdAndUserId = (id, userId) => {
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
  findOneById,
  findOneByIdAndUserId,
  update,
  remove,
};
