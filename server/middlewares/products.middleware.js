const Joi = require("@hapi/joi");

const {
  STATUS_CODE: { BAD_REQUEST }
} = require("../config/constants/index");

const validateRequest = (req, res, next) => {
  try {
    const schema = Joi.object({
      description: Joi.string().min(4).max(100).required(),
      price: Joi.number().integer().min(1).max(5000000).required()
    });

    const validate = schema.validate(req.body);

    if (validate.error)
      return res.status(BAD_REQUEST).json({ error: validate.error.message });
    next();
  } catch (error) {
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = {
  validateRequest
};
