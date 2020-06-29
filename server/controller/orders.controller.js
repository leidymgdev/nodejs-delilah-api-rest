const OrdersDao = require("../repository/dao/orders.dao");
const OrderDetailsDao = require("../repository/dao/orderDetails.dao");
const ProductDao = require("../repository/dao/products.dao");

const { ADMIN_USER_ID } = require("../config");

const {
  STATUS_CODE: { BAD_REQUEST },
  GENERAL_MESSAGES: { RESOURSE_DOES_NOT_EXIST }
} = require("../config/constants/index");

const create = async (req, res) => {
  try {
    const {
      userId,
      order: { statusId, paymentMethodId, orderDetails }
    } = req.body;

    let order = { description: "", userId, statusId, paymentMethodId };
    order = await OrdersDao.create(order);

    const resultOrderDetails = await createBulkOrderDetails(
      order.id,
      orderDetails
    );

    const successOrderDetails = resultOrderDetails.resultOrderDetails.filter(
      (orderDetail) => !orderDetail.error
    );

    const errorOrderDetails = resultOrderDetails.resultOrderDetails
      .filter((orderDetail) => orderDetail.error)
      .map((orderDetail) => ({
        message: orderDetail.message,
        productId: orderDetail.productId
      }));

    const description = resultOrderDetails.description;
    if (description) await OrdersDao.update(order.id, { description });

    return res.json({
      ...order.dataValues,
      description,
      orderDetails: {
        success: successOrderDetails,
        failure: errorOrderDetails
      }
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const read = async (req, res) => {
  try {
    const { id } = req.params;
    const { userTypeId, userId } = req.body;
    if (userTypeId === ADMIN_USER_ID) {
      if (id) {
        const order = await OrdersDao.findOne(id);
        return res.json(order);
      }
      const Orders = await OrdersDao.findAll();
      return res.json(Orders);
    } else {
      if (id) {
        const order = await OrdersDao.findOneByUserId(id, userId);
        return res.json(order);
      }
      const orders = await OrdersDao.findAllByUserId(userId);
      return res.json(orders);
    }
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

const createBulkOrderDetails = async (orderId, orderDetails) => {
  try {
    let resultOrderDetails = await Promise.all(
      orderDetails.map((orderDetail) => createOrderDetail(orderId, orderDetail))
    );

    const description = resultOrderDetails.reduce((str, orderDetail) => {
      if (!orderDetail.error) {
        const { quantity, productName } = orderDetail;
        str += `${quantity} x ${productName} `;
      }
      return str;
    }, "");

    return {
      description,
      resultOrderDetails
    };
  } catch (error) {
    console.log("createBulkOrderDetails", error);
  }
};

const createOrderDetail = async (orderId, orderDetail) => {
  try {
    const { productId } = orderDetail;

    const product = await ProductDao.findOne(productId);
    if (!product) {
      return {
        error: true,
        message: RESOURSE_DOES_NOT_EXIST,
        productId: productId
      };
    }

    const price = product.price;

    let data = {
      ...orderDetail,
      orderId,
      productId,
      price: Number(price)
    };

    const resultOrderDetail = await OrderDetailsDao.create(data);
    return {
      productName: product.name,
      ...resultOrderDetail.dataValues
    };
  } catch (error) {
    console.log("createOrderDetail", error);
  }
};

module.exports = {
  create,
  read,
  update,
  remove
};
