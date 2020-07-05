const Orders = require("../models/Orders");
const OrderDetails = require("../models/OrderDetails");
const Products = require("../models/Products");
const Users = require("../models/Users");
const PaymentMethods = require("../models/PaymentMethods");
const Statuses = require("../models/Statuses");

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
      attributes: ["quantity"]
    }
  },
  {
    model: Users,
    as: "user",
    required: false,
    attributes: [
      "id",
      "email",
      "username",
      "fullname",
      "cellphone",
      "shippingAddress",
      "roleId"
    ]
  },
  {
    model: Statuses,
    as: "status",
    required: false,
    attributes: ["id", "description"]
  },
  {
    model: PaymentMethods,
    as: "paymentMethod",
    required: false,
    attributes: ["id", "description"]
  }
];

const create = (body) => {
  return Orders.create(body);
};

const findAll = () => {
  return Orders.findAll({
    attributes: ["id", "description", "createdAt", "updatedAt"],
    include: ProductsJoinOrderDetails
  });
};

const findAllByUserId = (userId) => {
  return Orders.findAll({
    attributes: ["id", "description", "createdAt", "updatedAt"],
    where: { userId },
    include: [ProductsJoinOrderDetails]
  });
};

const findOneById = (id) => {
  return Orders.findOne({
    attributes: ["id", "description", "createdAt", "updatedAt"],
    where: { id },
    include: ProductsJoinOrderDetails
  });
};

const findOneByIdAndUserId = (id, userId) => {
  return Orders.findOne({
    attributes: ["id", "description", "createdAt", "updatedAt"],
    where: { id, userId },
    include: ProductsJoinOrderDetails
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

module.exports = {
  create,
  findAll,
  findAllByUserId,
  findOneById,
  findOneByIdAndUserId,
  update,
  updateStatus
};
