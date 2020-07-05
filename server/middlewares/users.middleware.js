const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const { SECRET_TOKEN, ADMIN_ROLE_ID } = require("../config");

const {
  STATUS_CODE: { BAD_REQUEST, UNAUTHORIZED, FORBIDDEN },
  GENERAL_MESSAGES: { BAD_CREDENTIALS, ACCESS_DENIED, TOKEN_EXPIRED }
} = require("../config/constants/index");

const validateRequestCreate = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().min(6).max(100).required().email(),
      password: Joi.string().min(6).max(30).required(),
      username: Joi.string().min(6).max(30).required(),
      fullname: Joi.string().min(6).max(200).required(),
      cellphone: Joi.string().min(7).max(20).required(),
      shippingAddress: Joi.string().min(6).max(200).required(),
      roleId: Joi.number().integer().min(1).max(2).required()
    });

    const validate = schema.validate(req.body);

    if (validate.error)
      return res.status(BAD_REQUEST).json({ error: validate.error.message });
    next();
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const validateRequestLogin = (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    if ((!email || !username) && password)
      return res.status(BAD_REQUEST).json({ error: BAD_CREDENTIALS });
    next();
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(UNAUTHORIZED).json({ error: ACCESS_DENIED });

    await jwt.verify(token, SECRET_TOKEN, (error, data) => {
      if (error) return res.status(UNAUTHORIZED).json({ error: TOKEN_EXPIRED });
      req.body.userId = data.id;
      req.body.roleId = data.roleId;
      next();
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const validateAdminPermissions = (req, res, next) => {
  try {
    if (req.body.roleId !== ADMIN_ROLE_ID)
      return res.status(FORBIDDEN).json({ error: ACCESS_DENIED });
    next();
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = {
  validateRequestCreate,
  validateRequestLogin,
  validateToken,
  validateAdminPermissions
};
