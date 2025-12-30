const Joi = require("joi");

class UserValidation {
  create() {
    return Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
    });
  }
}

module.exports = new UserValidation();
