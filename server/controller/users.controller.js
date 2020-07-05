const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UsersDao = require("../repository/dao/users.dao");

const { SALT_BCRYPT, SECRET_TOKEN, EXPIRES_IN_TOKEN } = require("../config");

const {
  STATUS_CODE: { CONFLICT_CODE, BAD_REQUEST_CODE, UNAUTHORIZED_CODE },
  GENERAL_MESSAGES: { RESOURCE_ALREADY_EXISTS, BAD_CREDENTIALS }
} = require("../config/constants/index");

/**
 * Create an user if username or email don't exist yet.
 * @param {*} req
 * @param {*} res
 * @returns {result, error}
 * Result -> If user has been created successfully.
 * Error -> If there was an error creating user.
 */
const create = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await UsersDao.findoneByEmailOrUsername(req.body);
    if (user)
      return res.status(CONFLICT_CODE).json({ error: RESOURCE_ALREADY_EXISTS });

    req.body.password = bcrypt.hashSync(password, SALT_BCRYPT);

    const result = await UsersDao.create(req.body);
    res.json(result);
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
  }
};

/**
 * User login. User can login with email or username, and a password.
 * @param {*} req : Email or username, and password.
 * @param {*} res
 * @returns {token, error}
 * token -> If login is succesfully.
 * error -> If login failure
 */
const login = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await UsersDao.findoneByEmailOrUsername(req.body);
    if (!user)
      return res.status(UNAUTHORIZED_CODE).json({ error: BAD_CREDENTIALS });

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword)
      return res.status(UNAUTHORIZED_CODE).json({ error: BAD_CREDENTIALS });

    const token = jwt.sign({ id: user.id, roleId: user.roleId }, SECRET_TOKEN, {
      expiresIn: EXPIRES_IN_TOKEN
    });
    return res.header("auth-token", token).json({ token });
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
  }
};

module.exports = {
  create,
  login
};
