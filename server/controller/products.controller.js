const ProductsDao = require("../repository/dao/products.dao");

const {
  STATUS_CODE: { BAD_REQUEST, NOT_FOUND },
  GENERAL_MESSAGES: { RESOURSE_DOES_NOT_EXIST }
} = require("../config/constants/index");

const create = async (req, res) => {
  try {
    const product = await ProductsDao.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const read = async (req, res) => {
  try {
    const products = await ProductsDao.findAll();
    res.json(products);
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await ProductsDao.findOne(id);
    if (!product)
      return res.status(NOT_FOUND).json({ error: RESOURSE_DOES_NOT_EXIST });

    req.body.id = product.id;
    await ProductsDao.update(id, req.body);
    res.json(req.body);
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await ProductsDao.findOne(id);
    if (!product)
      return res.status(NOT_FOUND).json({ error: RESOURSE_DOES_NOT_EXIST });

    req.body.id = product.id;
    await ProductsDao.remove(id);
    res.json(req.body);
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = {
  create,
  read,
  update,
  remove
};
