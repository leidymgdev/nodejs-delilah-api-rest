const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UsersDao = require("../repository/dao/users.dao");

const { SALT_BCRYPT, SECRET_TOKEN, EXPIRES_IN_TOKEN } = require("../config");

const {
  STATUS_CODE: { CONFLICT, BAD_REQUEST, UNAUTHORIZED },
  GENERAL_MESSAGES: { RESOURCE_ALREADY_EXISTS, BAD_CREDENTIALS }
} = require("../config/constants/index");

const create = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await UsersDao.findone(email, username);
    if (user)
      return res.status(CONFLICT).json({ error: RESOURCE_ALREADY_EXISTS });

    req.body.password = bcrypt.hashSync(password, SALT_BCRYPT);

    const result = await UsersDao.create(req.body);
    res.json(result);
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await UsersDao.findone(email, username);
    if (!user) return res.status(UNAUTHORIZED).json({ error: BAD_CREDENTIALS });

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword)
      return res.status(UNAUTHORIZED).json({ error: BAD_CREDENTIALS });

    const token = jwt.sign(
      { id: user.id, userTypeId: user.userTypeId },
      SECRET_TOKEN,
      {
        expiresIn: EXPIRES_IN_TOKEN
      }
    );
    return res.header("auth-token", token).json({ token });
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = {
  create,
  login
};
