const router = require("express").Router();

const ordersRouter = require("./orders");
const productsRouter = require("./products");
const usersRouter = require("./users");

router.use("/orders", ordersRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);

module.exports = router;
