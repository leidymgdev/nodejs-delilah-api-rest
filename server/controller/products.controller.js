const ProductsDao = require("../repository/dao/products.dao");

const {
  STATUS_CODE: { BAD_REQUEST_CODE, NOT_FOUND_CODE },
  GENERAL_MESSAGES: { RESOURCE_DOES_NOT_EXIST, RESOURCE_REMOVED_SUCCESSFULLY }
} = require("../config/constants/index");

const create = async (req, res) => {
  try {
    const result = await ProductsDao.create(req.body);
    res.json(result);
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
  }
};

const read = async (req, res) => {
  try {
    const products = await ProductsDao.findAll();
    res.json(products);
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await ProductsDao.findOneById(id);
    if (!product)
      return res
        .status(NOT_FOUND_CODE)
        .json({ error: RESOURCE_DOES_NOT_EXIST });

    req.body.id = product.id;
    const updatedProduct = await ProductsDao.update(id, req.body);

    res.json(updatedProduct);
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await ProductsDao.findOneById(id);
    if (!product)
      return res
        .status(NOT_FOUND_CODE)
        .json({ error: RESOURCE_DOES_NOT_EXIST });

    await ProductsDao.remove(id);

    res.json({ message: RESOURCE_REMOVED_SUCCESSFULLY });
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
  }
};

module.exports = {
  create,
  read,
  update,
  remove
};
