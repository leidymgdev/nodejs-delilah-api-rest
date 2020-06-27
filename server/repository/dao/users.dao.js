const { Op } = require("sequelize");
const Users = require("../models/Users");

const findone = (email, username) => {
  return Users.findOne({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  });
};

const create = (body) => {
  return Users.create(body);
};

module.exports = {
  findone,
  create,
};
