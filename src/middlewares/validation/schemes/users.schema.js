// NPM Modules
import Joi from 'joi';

const UsersSchema = {

  signupSchema: {
    body: Joi.object({
      name: Joi.string().min(1).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(7).required()
    })
  }

};

export default UsersSchema;
