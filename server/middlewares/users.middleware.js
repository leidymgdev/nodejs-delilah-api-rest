const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const { SECRET_TOKEN, ADMIN_ROLE_ID } = require("../config");

const {
  STATUS_CODE: { BAD_REQUEST_CODE, UNAUTHORIZED_CODE, FORBIDDEN_CODE },
  GENERAL_MESSAGES: { BAD_CREDENTIALS, ACCESS_DENIED, TOKEN_EXPIRED }
} = require("../config/constants/index");

/**
 * Validate all information of an user.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Goes to the next middleware / enter to the endpoint or return an error if doesn't pass the validation.
 */
const validateRequestCreate = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().min(6).max(100).required().email(),
      password: Joi.string().min(6).max(30).required(),
      username: Joi.string().min(6).max(30).required(),
      fullname: Joi.string().min(6).max(200).required(),
      cellphone: Joi.string().min(7).max(20).required(),
      shippingAddress: Joi.string().min(6).max(200).required(),
      roleId: Joi.number().integer().min(0).max(20)
    });

    const validate = schema.validate(req.body);

    if (validate.error)
      return res
        .status(BAD_REQUEST_CODE)
        .json({ error: validate.error.message });
    next();
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
  }
};

/**
 * Validate information from login user.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Goes to the next middleware / enter to the endpoint or return an error if doesn't pass the validation.
 */
const validateRequestLogin = (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    if ((!email || !username) && password)
      return res.status(BAD_REQUEST_CODE).json({ error: BAD_CREDENTIALS });
    next();
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
  }
};

/**
 * Validate if the request has a auth-token key with its value in the header and the expiration of it.
 * If the token pass the validation catch de userId and RoleId that is contained in the same token. (It is used for others middlewares and validations).
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Goes to the next middleware / enter to the endpoint or return an error if doesn't pass the validation.
 */
const validateToken = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token)
      return res.status(UNAUTHORIZED_CODE).json({ error: ACCESS_DENIED });

    await jwt.verify(token, SECRET_TOKEN, (error, data) => {
      if (error)
        return res.status(UNAUTHORIZED_CODE).json({ error: TOKEN_EXPIRED });
      req.body.userId = data.id;
      req.body.roleId = data.roleId;
      next();
    });
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
  }
};

/**
 * Validate if the user has permissions to enter to the endpoint.
 * The user can enter if has an administrator role.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Goes to the next middleware / enter to the endpoint or return an error if doesn't pass the validation.
 */
const validateAdminPermissions = (req, res, next) => {
  try {
    if (req.body.roleId !== ADMIN_ROLE_ID)
      return res.status(FORBIDDEN_CODE).json({ error: ACCESS_DENIED });
    next();
  } catch (error) {
    res.status(BAD_REQUEST_CODE).json({ error: error.message });
  }
};

module.exports = {
  validateRequestCreate,
  validateRequestLogin,
  validateToken,
  validateAdminPermissions
};
