const router = require("express").Router();

const ordersRouter = require("./orders.route");
const productsRouter = require("./products.route");
const usersRouter = require("./users.route");

router.use("/orders", ordersRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../index.json');

// router.use('/docs', swaggerUi.serve);
// router.get('/docs', swaggerUi.setup(swaggerDocument));

// const swaggerUi = require('swagger-ui-express');
// const YAML = require('yamljs');
// const swaggerDocument = YAML.load('../index.yaml');

// router.use('/docs', swaggerUi.serve);
// router.get('/docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
