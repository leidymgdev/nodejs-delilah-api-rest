const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const Users = require("../repository/models/Users");
const { SALT_BCRYPT } = require("../config");

const create = async (req) => {
  try {
    const { email, username, password } = req;

    const exists = await Users.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });
    if (exists) return { status: 400, error: "User already exists." };

    req.password = bcrypt.hashSync(password, SALT_BCRYPT);
    const result = await Users.create(req);
    return { status: 200, result };
  } catch (error) {
    return { status: 400, error: error.message };
  }
};

module.exports = {
  create,
};
