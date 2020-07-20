const create = (body) => {
  return Orders.create(body);
};

const findAll = () => {
  return null;
  /*Orders.findAll({
    attributes: ["id", "description", "createdAt", "updatedAt"],
    include: associationsOfAnOrder,
  });*/
};

const findAllByUserId = (userId) => {
  return null;
  /*Orders.findAll({
    attributes: ["id", "description", "createdAt", "updatedAt"],
    where: { userId },
    include: associationsOfAnOrder,
  });*/
};

const findOneById = (id) => {
  return null;
  /*Orders.findOne({
    attributes: ["id", "description", "createdAt", "updatedAt"],
    where: { id },
    include: associationsOfAnOrder,
  });*/
};

const findOneByIdAndUserId = (id, userId) => {
  return null;
  /*Orders.findOne({
    attributes: ["id", "description", "createdAt", "updatedAt"],
    where: { id, userId },
    include: associationsOfAnOrder,
  });*/
};

const update = (id, body) => {
  return null;
  //Orders.update(body, { where: { id } }).then(() => findOneById(id));
};

const updateStatus = (id, statusId) => {
  return null;
  /*Orders.update({ statusId }, { where: { id } }).then(() =>
    findOneById(id)
  );*/
};

const remove = (id) => {
  return null; // Orders.destroy({ where: { id } });
};

module.exports = {
  create,
  findAll,
  findAllByUserId,
  findOneById,
  findOneByIdAndUserId,
  update,
  updateStatus,
  remove,
};
