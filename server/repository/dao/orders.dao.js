const Orders = require("../models/Orders");
const OrderDetails = require("../models/OrderDetails");
const Products = require("../models/Products");
const Users = require("../models/Users");
const PaymentMethods = require("../models/PaymentMethods");
const Statuses = require("../models/Statuses");

const associationsOfAnOrder = [
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
    include: associationsOfAnOrder
  });
};

const findAllByUserId = (userId) => {
  return Orders.findAll({
    attributes: ["id", "description", "createdAt", "updatedAt"],
    where: { userId },
    include: associationsOfAnOrder
  });
};

const findOneById = (id) => {
  return Orders.findOne({
    attributes: ["id", "description", "createdAt", "updatedAt"],
    where: { id },
    include: associationsOfAnOrder
  });
};

const findOneByIdAndUserId = (id, userId) => {
  return Orders.findOne({
    attributes: ["id", "description", "createdAt", "updatedAt"],
    where: { id, userId },
    include: associationsOfAnOrder
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
  remove
};
