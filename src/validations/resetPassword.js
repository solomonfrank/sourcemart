import Joi from '@hapi/joi';

const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    .required(),

  confirmPassword: Joi.ref('password')
}).with('password', 'confirmPassword');

export default resetPasswordSchema;
