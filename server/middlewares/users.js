const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const SECRET_TOKEN = "s3cr3tT0k3n";
const ADMIN_ROLE_ID = 2;

const validateCreate = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().min(6).max(100).required().email(),
      password: Joi.string().min(6).max(30).required(),
      username: Joi.string().min(6).max(30).required(),
      fullname: Joi.string().min(6).max(200).required(),
      cellphone: Joi.string().min(7).max(20).required(),
      shippingAddress: Joi.string().min(6).max(200).required(),
      roleId: Joi.number().integer().min(0).max(20),
    });

    const validate = schema.validate(req.body);

    if (validate.error)
      return res.status(400).json({ error: validate.error.message });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validateLogin = (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    if ((!email || !username) && password)
      return res.status(400).json({ error: "Bad credentials." });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ error: "Access denied." });

    await jwt.verify(token, SECRET_TOKEN, (error, data) => {
      if (error) return res.status(401).json({ error: "Access denied." });
      req.body.userId = data.id;
      req.body.roleId = data.roleId;
      next();
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validatePermissions = (req, res, next) => {
  try {
    if (req.body.roleId !== ADMIN_ROLE_ID)
      return res.status(403).json({ error: "Access denied." });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  validateCreate,
  validateLogin,
  validateToken,
  validatePermissions,
};
