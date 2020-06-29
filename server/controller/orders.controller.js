const OrdersDao = require("../repository/dao/orders.dao");
const OrdersDetailsDao = require("../repository/dao/ordersDetails.dao");
const ProductDao = require("../repository/dao/products.dao");

const {
  STATUS_CODE: { BAD_REQUEST, NOT_CREATED }
} = require("../config/constants/index");

const create = async (req, res) => {
  try {
    const {
      userId,
      order: { statusId, paymentMethodId, ordersDetails }
    } = req.body;

    let order = { description: "", userId, statusId, paymentMethodId };
    order = await OrdersDao.create(order);

    const resultOrdersDetails = await createBulkOrderDetails(
      order,
      ordersDetails
    );
    const description = resultOrdersDetails.description;

    const isUpdated = await OrdersDao.update(order.id, {
      description
    });

    if (isUpdated[0]) {
      return res.json({ ...order.dataValues, description });
    } else {
      return res
        .status(NOT_CREATED)
        .json({ error: "Could not update the order description field" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const read = async (req, res) => {
  try {
    return null;
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

const createBulkOrderDetails = async (order, ordersDetails) => {
  try {
    let resultOrdersDetails = await Promise.all(
      ordersDetails.map((orderDetail) =>
        createOrderDetail(order.id, orderDetail)
      )
    );

    const description = resultOrdersDetails.reduce((str, orderDetail) => {
      const { quantity, productName } = orderDetail;
      str += `${quantity} x ${productName}`;
      return str;
    }, "");

    return {
      description,
      resultOrdersDetails
    };
  } catch (error) {
    console.error(error.message);
  }
};

const createOrderDetail = async (orderId, orderDetail) => {
  try {
    const { productId } = orderDetail;

    // VALIDAR PRODUCTS
    const product = await ProductDao.findOne(productId);
    const price = product.price;

    let data = {
      ...orderDetail,
      orderId,
      productId,
      price: Number(price)
    };

    const resultOrderDetail = await OrdersDetailsDao.create(data);
    return {
      productName: product.name,
      ...resultOrderDetail.dataValues
    };
  } catch (error) {
    console.log("createOrderDetail", error); // Cambiar
  }
};

module.exports = {
  create,
  read,
  update,
  remove
};
