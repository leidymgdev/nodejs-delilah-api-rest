const { Op } = require("sequelize");
const Users = require("../models/Users");

const findoneByEmailOrUsername = (body) => {
  return Users.findOne({
    where: {
      [Op.or]: [{ email: body.email }, { username: body.username }]
    }
  })
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while finding User: ${err}` }));
};

const create = (body) => {
  return Users.create(body)
    .then((result) => result)
    .catch((err) => ({ error: `>> Error while creating User: ${err}` }));
};

module.exports = {
  findoneByEmailOrUsername,
  create
};
