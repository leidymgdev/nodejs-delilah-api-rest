const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const { SECRET_TOKEN, ADMIN_USER_ID } = require("../config");

const validateRequestLogin = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(30),
  });

  const validate = schema.validate(req.body);

  if (validate.error)
    return res.status(400).json({ error: validate.error.message });
  next();
};

const validateRequestCreate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(30).required(),
    username: Joi.string().min(6).max(30).required(),
    fullname: Joi.string().min(6).max(200).required(),
    cellphone: Joi.string().min(7).max(20).required(),
    shippingAddress: Joi.string().min(6).max(200).required(),
    userTypeId: Joi.number().integer().min(1).max(1).required(),
  });

  const validate = schema.validate(req.body);

  if (validate.error)
    return res.status(400).json({ error: validate.error.message });
  next();
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ error: "Access denied." });

    await jwt.verify(token, SECRET_TOKEN, (error, data) => {
      if (error) return res.status(403).json({ error: "Token expired" });
      req.body = {
        ...req.body,
        userId: data.id,
        userTypeId: data.userTypeId,
      };
      next();
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validateAdminPermissions = (req, res, next) => {
  try {
    if (req.body.userTypeId !== ADMIN_USER_ID)
      return res.status(401).json({ error: "Access denied." });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  validateRequestLogin,
  validateRequestCreate,
  validateToken,
  validateAdminPermissions,
};
