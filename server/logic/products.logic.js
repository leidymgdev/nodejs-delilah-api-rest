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
    const products = await Products.findAll();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    return null;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    return null;
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
