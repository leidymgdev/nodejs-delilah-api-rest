const { Op } = require("sequelize");
const Users = require("../models/Users");

const findone = (body) => {
  return Users.findOne({
    where: {
      [Op.or]: [{ email: body.email }, { username: body.username }]
    }
  });
};

const create = (body) => {
  return Users.create(body);
};

module.exports = {
  findone,
  create
};
