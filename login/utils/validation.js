const Joi = require('@hapi/joi');

const signupValidation = data => {
  const schema = Joi.object({
    id: Joi.string().min(5).required(),
    password: Joi.string().min(10).required(),
  });

  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    id: Joi.string().min(5).required(),
    password: Joi.string().min(10).required(),
  });

  return schema.validate(data);
};

module.exports = {signupValidation, loginValidation};
