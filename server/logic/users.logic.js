const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../repository/models/Users");
const { SALT_BCRYPT, SECRET_TOKEN, EXPIRES_IN_TOKEN } = require("../config");

const create = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await Users.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });
    if (user) return res.status(400).json({ error: "User already exists." });

    req.body.password = bcrypt.hashSync(password, SALT_BCRYPT);
    const result = await Users.create(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await Users.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (!user) return res.status(400).json({ error: "Bad credentials." });

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword)
      return res.status(400).json({ error: "Bad credentials." });

    const token = jwt.sign({ id: user.id }, SECRET_TOKEN, {
      expiresIn: EXPIRES_IN_TOKEN,
    });
    return res.header("auth-token", token).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  create,
  login,
};
