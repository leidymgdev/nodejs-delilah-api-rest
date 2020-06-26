const { Op } = require("sequelize");
const Products = require("../repository/models/Products");

const create = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const read = async (req, res) => {
  try {
    const products = await Products.findAll({
      where: { stock: { [Op.gt]: 0 } }, // > 0
    });
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    let product = await Products.findOne({ where: { id: req.body.id } });
    if (!product)
      return res.status(400).json({ error: "Product does not exist." });

    await Products.update(req.body, { where: { id: req.body.id } });
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    let product = await Products.findOne({ where: { id: req.body.id } });
    if (!product)
      return res.status(400).json({ error: "Product does not exist." });

    await Products.destroy({ where: { id: req.body.id } });
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  create,
  read,
  update,
  remove,
};
