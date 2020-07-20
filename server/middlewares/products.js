const Joi = require("@hapi/joi");

const validateRequest = (req, res, next) => {
  try {
    const schema = Joi.object({
      description: Joi.string().min(4).max(100).required(),
      price: Joi.number().integer().min(1).max(5000000).required(),
    });

    const validate = schema.validate(req.body);

    if (validate.error)
      return res.status(400).json({ error: validate.error.message });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  validateRequest,
};
