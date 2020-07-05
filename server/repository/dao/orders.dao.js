const Orders = require("../models/Orders");
const OrderDetails = require("../models/OrderDetails");
const Products = require("../models/Products");
const Users = require("../models/Users");

const ProductsJoinOrderDetails = [
  {
    model: Products,
    as: "products",
    required: false,
    // Pass in the Product attributes that you want to retrieve
    attributes: ["id", "description", "price"],
    through: {
      // This block of code allows you to retrieve the properties of the join table
      model: OrderDetails,
      as: "orderDetails",
      attributes: ["quantity"],
    },
  },
];

const create = (body) => {
  return Orders.create(body);
};

const findAll = () => {
  return Orders.findAll({ include: ProductsJoinOrderDetails });
};

const findAllByUserId = (userId) => {
  return Orders.findAll({
    where: { userId },
    include: [ProductsJoinOrderDetails],
  });
};

const findOneById = (id) => {
  return Orders.findOne({ where: { id }, include: ProductsJoinOrderDetails });
};

const findOneByIdAndUserId = (id, userId) => {
  return Orders.findOne({
    where: { id, userId },
    include: ProductsJoinOrderDetails,
  });
};

const update = (id, body) => {
  return Orders.update(body, { where: { id } }).then(() => findOneById(id));
};

const updateStatus = (id, statusId) => {
  return Orders.update({ statusId }, { where: { id } }).then(() =>
    findOneById(id)
  );
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
  updateStatus,
  remove,
};
