const OrdersDao = require("../repository/dao/orders.dao");
const OrderDetailsDao = require("../repository/dao/orderDetails.dao");
const ProductsDao = require("../repository/dao/products.dao");

const { ADMIN_USER_ID } = require("../config");

const {
  STATUS_CODE: { BAD_REQUEST },
  GENERAL_MESSAGES: { RESOURCE_DOES_NOT_EXIST }
} = require("../config/constants/index");

const create = async (req, res) => {
  try {
    // Create and save the order
    const savedOrder = await OrdersDao.create(req.body);

    await createOrderDetail(savedOrder.id, req.body.products);

    // If everyting goes well, respond with the order
    res.json(savedOrder);
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const createOrderDetail = async (orderId, products) => {
  // Loop through all the items in req.products
  for (const item of products) {
    // Search for the product with the givenId and make sure it exists. If it doesn't, respond with status 400.
    const product = await ProductsDao.findOneById(item.id);
    if (!product)
      return res.status(BAD_REQUEST).json({ error: RESOURCE_DOES_NOT_EXIST });

    // Create a dictionary with which to create the Order Detail
    const orderDetail = {
      orderId,
      productId: item.id,
      quantity: item.quantity
    };

    // Create and save a Order Detail
    await OrderDetailsDao.create(orderDetail);
  }
};

const read = async (req, res) => {
  try {
    // Get all orders
    const orders = await OrdersDao.findAll();
    return res.json(orders);
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    return null;
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    return null;
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const getOrderDetails = async () => {};

module.exports = {
  create,
  read,
  update,
  remove
};
