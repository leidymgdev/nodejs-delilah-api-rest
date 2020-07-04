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

    const savedOrderDetails = await createOrderDetail(
      savedOrder.id,
      req.body.products
    );

    const { description, success, error } = savedOrderDetails;
    if (description) await OrdersDao.update(savedOrder.id, { description });

    // If everyting goes well, respond with the order
    res.json({ ...savedOrder.dataValues, success, error });
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const createOrderDetail = async (orderId, products) => {
  let description = "";
  let success = new Array();
  let error = new Array();

  // Loop through all the items in req.products
  for (const item of products) {
    // Search for the product with the givenId and make sure it exists. If it doesn't, respond with status 400.
    const product = await ProductsDao.findOneById(item.id);
    if (!product) {
      error.push({
        message: RESOURCE_DOES_NOT_EXIST,
        id: item.id
      });
    } else {
      description += `${item.quantity} x ${product.name} `;

      // Create a dictionary with which to create the Order Detail
      const orderDetail = {
        orderId,
        productId: item.id,
        quantity: item.quantity
      };

      // Create and save a Order Detail
      let savedOrderDetail = await OrderDetailsDao.create(orderDetail);
      success.push(savedOrderDetail);
    }
  }

  return {
    description,
    success,
    error
  };
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

module.exports = {
  create,
  read,
  update,
  remove
};
