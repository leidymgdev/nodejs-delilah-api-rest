const OrdersDao = require("../repository/dao/orders.dao");
const OrderDetailsDao = require("../repository/dao/orderDetails.dao");
const ProductsDao = require("../repository/dao/products.dao");

const { ADMIN_ROLE_ID } = require("../config");

const {
  STATUS_CODE: { BAD_REQUEST, NOT_FOUND },
  GENERAL_MESSAGES: { RESOURCE_DOES_NOT_EXIST },
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
        id: item.id,
      });
    } else {
      description += `${item.quantity} x ${product.name} `;

      // Create a dictionary with which to create the Order Detail
      const orderDetail = {
        orderId,
        productId: item.id,
        quantity: item.quantity,
      };

      // Create and save a Order Detail
      let savedOrderDetail = await OrderDetailsDao.create(orderDetail);
      success.push(savedOrderDetail);
    }
  }

  return {
    description,
    success,
    error,
  };
};

/**
 * Read orders:
 * -> All:              For Administrator Role
 * -> All by user id:   For Client Role
 * @param {*} req
 * @param {*} res
 * @returns {[]}        Orders array
 */
const readAll = async (req, res) => {
  try {
    const { roleId, userId } = req.body;
    let orders = null;

    if (roleId === ADMIN_ROLE_ID) {
      orders = await OrdersDao.findAll();
    } else {
      // Client
      orders = await OrdersDao.findAllByUserId(userId);
    }

    // Calcule total for each order
    orders = orders.map((order) => {
      const total = calculateTotal(order);
      return { ...order.dataValues, total };
    });

    return res.json(orders);
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

/**
 * Read orders by id order:
 * -> By id order:                For Administrator Role
 * -> By id order and id user:    For Client Role
 * @param {*} req
 * @param {*} res
 * @returns {object}              Order Object
 */
const readById = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleId, userId } = req.body;

    let order = null;

    if (roleId === ADMIN_ROLE_ID) {
      order = await OrdersDao.findOneById(id);
    } else {
      // Client
      order = await OrdersDao.findOneByIdAndUserId(id, userId);
    }

    // Calcule order total
    const total = calculateTotal(order);

    return res.json({ ...order.dataValues, total });
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

/**
 * Calculate total for one order
 * @param {*} order with products
 * @returns order total
 */
const calculateTotal = (order) => {
  return order.products.reduce((accumulator, product) => {
    const {
      price,
      orderDetails: { quantity },
    } = product;
    const value = price * quantity;
    return accumulator + value;
  }, 0);
};

/**
 * Update order statuses.
 * This one is also for "removing" an order (change state for cancelled).
 * @param {*} req
 * @param {*} res
 * @returns {object} order object with status updated
 */
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusId } = req.body;

    let order = await OrdersDao.findOneById(id);
    if (!order)
      return res.status(NOT_FOUND).json({ error: RESOURCE_DOES_NOT_EXIST });

    const updatedStatus = await OrdersDao.updateStatus(id, statusId);

    res.json(updatedStatus);
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = {
  create,
  readAll,
  readById,
  updateStatus,
};
