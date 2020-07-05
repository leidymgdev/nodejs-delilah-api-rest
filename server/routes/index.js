const router = require("express").Router();

const docsRouter = require("./docs.route");
const ordersRouter = require("./orders.route");
const productsRouter = require("./products.route");
const usersRouter = require("./users.route");

router.use("/docs", docsRouter);
router.use("/orders", ordersRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);

module.exports = router;
