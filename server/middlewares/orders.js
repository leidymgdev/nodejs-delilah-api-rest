const Joi = require("@hapi/Joi");

const validateRequest = (req, res, next) => {
  try {
    const productSchema = Joi.object({
      id: Joi.number().integer().min(1).max(9999999999).required(),
      quantity: Joi.number().integer().min(1).max(999).required(),
    }).required();

    const arrayProductsSchema = Joi.array()
      .items(productSchema)
      .min(1)
      .unique()
      .required();

    const orderSchema = Joi.object({
      paymentMethodId: Joi.number().integer().min(1).max(2).required(),
      products: Joi.alternatives()
        .try(productSchema, arrayProductsSchema)
        .required(),
    });

    const validate = orderSchema.validate(req.body);

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
