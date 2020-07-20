const create = (body) => {
  return null; //Products.create(body);
};

const findAll = () => {
  return null; //Products.findAll();
};

const findAllByIds = (arrayIdsProducts) => {
  return null;
  /*Products.findAll({
    where: { id: { [Op.in]: arrayIdsProducts } },
  });*/
};

const findOneById = (id) => {
  return null; //Products.findOne({ where: { id } });
};

const update = (id, body) => {
  return null; // Products.update(body, { where: { id } }).then(() => findOneById(id));
};

const remove = (id) => {
  return null; //Products.destroy({ where: { id } });
};

module.exports = {
  create,
  findAll,
  findAllByIds,
  findOneById,
  update,
  remove,
};
