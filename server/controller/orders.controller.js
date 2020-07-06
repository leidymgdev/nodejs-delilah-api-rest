const OrdersDao = require("../repository/dao/orders.dao");
const OrderDetailsDao = require("../repository/dao/orderDetails.dao");
const ProductsDao = require("../repository/dao/products.dao");

const { ADMIN_ROLE_ID } = require("../config");

const {
  STATUS_CODE: { BAD_REQUEST_CODE, NOT_FOUND_CODE },
  GENERAL_MESSAGES: {
    RESOURCE_DOES_NOT_EXIST,
    ID_STATUS_RESOURCE_REQUIRED,
    RESOURCE_REMOVED_SUCCESSFULLY,
    BAD_REQUEST
  }
} = require("../config/constants/index");

/**
 * Create an order and its order details.
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  try {
    // Validate the existence of the products in the order detail before create the order and its order detail.
    const validatedProducts = await validateProductsOrderDetail(
      req.body.products
    );
    if (validatedProducts && validatedProducts.error)
      return res
        .status(BAD_REQUEST_CODE)
        .json({ error: BAD_REQUEST, detailError: validatedProducts.error });

    // Create and save the order
    let savedOrder = await OrdersDao.create(req.body);

    // Create and save the order detail
    const savedOrderDetails = await createOrderDetail(
      savedOrder.id,
      req.body.products
    );

    // Get the description of an order and update it.
    const { description } = savedOrderDetails;
    if (description)
      savedOrder = await OrdersDao.update(savedOrder.id, { description });

    // If everyting goes well, respond with the order
    res.json(savedOrder);
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
  }
};

/**
 * Validate if all the products to be inserted in the order detail exist.
 *  If there is a product that does not exist, it does not insert anything and returns an error.
 * @param {*} products
 * @returns {null, error}
 * null -> If doesn't have an error.
 * error -> If there is al least one error.
 */
const validateProductsOrderDetail = async (products) => {
  // Create an array of products id from products
  const arrayIdsProductsRequest = products.map((item) => item.id);

  // With arrayIdsProductsRequest find all products and transform to an array of products id
  const arrayIdsProductsDB = (
    await ProductsDao.findAllByIds(arrayIdsProductsRequest)
  ).map((item) => item.id);

  /* Compare arrayIdsProductsRequest with arrayIdsProductsDB
     and get the difference bewteem them and transform de difference in an array of products id with a message error. */
  if (arrayIdsProductsRequest.length != arrayIdsProductsDB.length) {
    let detailError = arrayIdsProductsRequest
      .filter((item) => !arrayIdsProductsDB.includes(item))
      .map((item) => {
        return {
          id: item,
          message: "Resource doesn't exist."
        };
      });

    return { error: detailError };
  }
};

/**
 * Create orders details from an order.
 * @param {*} orderId
 * @param {*} products
 * @returns {description, success, error}
 * description -> Description of an order.
 * success -> Details of successfully saved orders.
 * error -> Details of failed orders.
 */
const createOrderDetail = async (orderId, products) => {
  let description = "";

  // Loop through all the items in req.products
  for (const item of products) {
    const product = await ProductsDao.findOneById(item.id);

    description += `${item.quantity} x ${product.description} `;

    // Create a dictionary with which to create the Order Detail
    const orderDetail = {
      orderId,
      productId: item.id,
      quantity: item.quantity
    };

    // Create and save a Order Detail
    await OrderDetailsDao.create(orderDetail);
  }

  return {
    description
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
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
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
    if (order) {
      const total = calculateTotal(order);
      order = { ...order.dataValues, total };
    }

    return res.json(order);
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
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
      orderDetails: { quantity }
    } = product;
    const value = price * quantity;
    return accumulator + value;
  }, 0);
};

/**
 * Update order statuses.
 * @param {*} req
 * @param {*} res
 * @returns {object} order object with status updated
 */
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusId } = req.body;

    if (!statusId)
      return res
        .status(BAD_REQUEST_CODE)
        .json({ error: ID_STATUS_RESOURCE_REQUIRED });

    let order = await OrdersDao.findOneById(id);
    if (!order)
      return res
        .status(NOT_FOUND_CODE)
        .json({ error: RESOURCE_DOES_NOT_EXIST });

    const updatedStatus = await OrdersDao.updateStatus(id, statusId);

    res.json(updatedStatus);
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    let order = await OrdersDao.findOneById(id);
    if (!order)
      return res
        .status(NOT_FOUND_CODE)
        .json({ error: RESOURCE_DOES_NOT_EXIST });

    // Delete order detail
    await OrderDetailsDao.remove(id);

    // Delete order
    await OrdersDao.remove(id);

    res.json({ message: RESOURCE_REMOVED_SUCCESSFULLY });
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
  }
};

module.exports = {
  create,
  readAll,
  readById,
  updateStatus,
  remove
};
