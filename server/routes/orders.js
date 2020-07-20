const router = require("express").Router();

const { validateToken, validatePermissions } = require("../middlewares/users");

const { validateRequest } = require("../middlewares/orders");

const OrdersDao = require("../database/dao/orders");
const ProductsDao = require("../database/dao/products");
const OrderDetailsDao = require("../database/dao/orderDetails");

const ADMIN_ROLE_ID = 2;

router.post("/", validateRequest, validateToken, async (req, res) => {
  try {
    const validatedProducts = await validateProductsOrderDetail(
      req.body.products
    );

    if (validatedProducts && validatedProducts.error)
      return res
        .status(400)
        .json({ error: 400, detailError: validatedProducts.error });

    let savedOrder = await OrdersDao.create(req.body);

    await createOrderDetail(savedOrder[0], req.body.products);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", validateToken, async (req, res) => {
  try {
    const { roleId, userId } = req.body;
    let orders = null;

    if (roleId === ADMIN_ROLE_ID) {
      orders = await OrdersDao.findAll();
    } else {
      orders = await OrdersDao.findAllByUserId(userId);
    }

    return res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { roleId, userId } = req.body;

    let order = null;

    if (roleId === ADMIN_ROLE_ID) {
      order = await OrdersDao.findOneById(id);
    } else {
      order = await OrdersDao.findOneByIdAndUserId(id, userId);
    }

    return res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", validateToken, validatePermissions, async (req, res) => {
  try {
    const { id } = req.params;
    const { statusId } = req.body;

    if (!statusId)
      return res
        .status(400)
        .json({ error: "The resource status id is required." });

    let order = await OrdersDao.findOneById(id);
    if (!order.length)
      return res.status(404).json({ error: "Resource does not exist." });

    await OrdersDao.updateStatus(id, statusId);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", validateToken, validatePermissions, async (req, res) => {
  try {
    const { id } = req.params;

    let order = await OrdersDao.findOneById(id);
    if (!order.length)
      return res.status(404).json({ error: "Resource does not exist." });

    await OrderDetailsDao.remove(id);

    await OrdersDao.remove(id);

    res.json({ message: "Resource removed successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const validateProductsOrderDetail = async (products) => {
  const arrayIdsProductsRequest = products.map((item) => item.id);

  const arrayIdsProductsDB = (
    await ProductsDao.findAllByIds(arrayIdsProductsRequest)
  ).map((item) => item.id);

  if (arrayIdsProductsRequest.length != arrayIdsProductsDB.length) {
    let detailError = arrayIdsProductsRequest
      .filter((item) => !arrayIdsProductsDB.includes(item))
      .map((item) => {
        return {
          id: item,
          message: "Resource doesn't exist.",
        };
      });

    return { error: detailError };
  }
};

const createOrderDetail = async (orderId, products) => {
  for (const item of products) {
    const orderDetail = {
      orderId,
      productId: item.id,
      quantity: item.quantity,
    };

    await OrderDetailsDao.create(orderDetail);
  }
};

module.exports = router;
