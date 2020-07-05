const OrderDetails = require("../models/OrderDetails");

const create = (body) => {
  return OrderDetails.create(body);
};

module.exports = {
  create
};
