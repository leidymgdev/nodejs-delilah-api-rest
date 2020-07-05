const Joi = require("@hapi/joi");

const {
  STATUS_CODE: { BAD_REQUEST_CODE }
} = require("../config/constants/index");

/**
 * Validate all information of a product.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Goes to the next middleware / enter to the endpoint or return an error if doesn't pass the validation.
 */
const validateRequest = (req, res, next) => {
  try {
    const schema = Joi.object({
      description: Joi.string().min(4).max(100).required(),
      price: Joi.number().integer().min(1).max(5000000).required()
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

module.exports = {
  validateRequest
};
