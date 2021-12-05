const Joi = require('@hapi/joi');

const signupValidation = data => {
  const schema = {
    id: Joi.string().min(5).required(),
    password: Joi.stirng().min(10).required(),
  };

  return Joi.validate(data, schema);
};

const loginValidation = data => {
  const schema = {
    id: Joi.string().min(5).required(),
    password: Joi.stirng().min(10).required(),
  };

  return Joi.validate(data, schema);
};

module.exports = {signupValidation, loginValidation};
