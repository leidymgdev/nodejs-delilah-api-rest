const findoneByEmailOrUsername = (body) => {
  return null;
  /* Users.findOne({
    where: {
      [Op.or]: [{ email: body.email }, { username: body.username }],
    },
  })
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while finding User: ${err}` })); */
};

const create = (body) => {
  return null;
  /*Users.create(body)
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while creating User: ${err}` }));*/
};

module.exports = {
  findoneByEmailOrUsername,
  create,
};
